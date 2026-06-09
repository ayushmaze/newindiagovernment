/**
 * NIG Admin — native review app for The New India Government news pipeline.
 *
 * Flow: login (Payload auth) → News Queue (drafted items) → review a draft
 * (verdict, claim-vs-truth, sources) → Publish / Reject (one tap). Registers
 * an Expo push token so the pipeline can notify "N drafts ready".
 *
 * Single-file for clarity; split into modules as it grows.
 */

import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

const API = (Constants.expoConfig?.extra?.apiBase as string) ?? 'https://newindiagovernment.com'

const C = {
  ink: '#1a1a1a',
  bg: '#ffffff',
  soft: '#fafaf8',
  red: '#c81e1e',
  gold: '#b8923a',
  green: '#3a7d44',
  hair: '#e5e5e5',
  ink3: '#8a8a8a',
}

type NewsItem = {
  id: string | number
  sourceTitle: string
  sourceName?: string
  sourceUrl?: string
  verdict?: string
  route?: string
  confidence?: string
  status?: string
  linkedArticle?: { id: number; title?: string; excerpt?: string } | number | null
}

// ---------- API helpers ----------
async function apiLogin(email: string, password: string): Promise<string> {
  const res = await fetch(`${API}/api/users/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Invalid email or password')
  const data = await res.json()
  if (!data.token) throw new Error('No token returned')
  return data.token as string
}

async function apiQueue(token: string): Promise<NewsItem[]> {
  const res = await fetch(
    `${API}/api/news-items?where[status][equals]=drafted&depth=1&limit=50&sort=-updatedAt`,
    { headers: { Authorization: `JWT ${token}` } },
  )
  if (!res.ok) throw new Error('Failed to load queue')
  const data = await res.json()
  return (data.docs ?? []) as NewsItem[]
}

async function apiReview(
  token: string,
  newsItemId: string | number,
  action: 'publish' | 'reject',
): Promise<void> {
  const res = await fetch(`${API}/api/admin/news-review`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `JWT ${token}` },
    body: JSON.stringify({ newsItemId: String(newsItemId), action }),
  })
  if (!res.ok) {
    const e = await res.json().catch(() => ({}))
    throw new Error(e.error ?? 'Action failed')
  }
}

async function registerPush(token: string) {
  try {
    if (!Device.isDevice) return
    const { status: existing } = await Notifications.getPermissionsAsync()
    let status = existing
    if (existing !== 'granted') {
      status = (await Notifications.requestPermissionsAsync()).status
    }
    if (status !== 'granted') return
    const projectId = Constants.expoConfig?.extra?.eas?.projectId
    const pushToken = (
      await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined)
    ).data
    await fetch(`${API}/api/admin/register-push`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `JWT ${token}` },
      body: JSON.stringify({ token: pushToken, platform: Device.osName?.toLowerCase(), label: Device.deviceName }),
    })
  } catch {
    /* non-fatal */
  }
}

function verdictColor(v?: string): string {
  if (v === 'true' || v === 'mostly-true') return C.green
  if (v === 'mixed') return C.gold
  return C.red
}

// ---------- Screens ----------
function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async () => {
    setBusy(true)
    setErr('')
    try {
      const token = await apiLogin(email.trim(), password)
      await SecureStore.setItemAsync('nig_token', token)
      onLogin(token)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <View style={s.center}>
      <Text style={s.brand}>THE NEW INDIA{'\n'}GOVERNMENT</Text>
      <Text style={s.sub}>Admin · Review desk</Text>
      <TextInput
        style={s.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={C.ink3}
      />
      <TextInput
        style={s.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={C.ink3}
      />
      {err ? <Text style={s.err}>{err}</Text> : null}
      <Pressable style={s.btnPrimary} onPress={submit} disabled={busy}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={s.btnPrimaryT}>Sign in</Text>}
      </Pressable>
    </View>
  )
}

function Queue({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<NewsItem | null>(null)
  const [acting, setActing] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await apiQueue(token))
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
    registerPush(token)
  }, [load, token])

  const act = async (action: 'publish' | 'reject') => {
    if (!selected) return
    setActing(true)
    try {
      await apiReview(token, selected.id, action)
      setSelected(null)
      await load()
    } catch (e) {
      // surface minimal error inline
      setSelected({ ...selected, sourceTitle: `⚠ ${e instanceof Error ? e.message : 'error'}` })
    } finally {
      setActing(false)
    }
  }

  // Detail view
  if (selected) {
    const art =
      typeof selected.linkedArticle === 'object' ? selected.linkedArticle : null
    return (
      <View style={s.screen}>
        <Pressable onPress={() => setSelected(null)} style={s.back}>
          <Text style={s.backT}>‹ Queue</Text>
        </Pressable>
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          <View style={[s.badge, { backgroundColor: verdictColor(selected.verdict) }]}>
            <Text style={s.badgeT}>
              {(selected.verdict ?? 'pending').toUpperCase()}
              {selected.route === 'debunk' ? ' · DEBUNK' : ''}
            </Text>
          </View>
          <Text style={s.title}>{art?.title ?? selected.sourceTitle}</Text>
          {art?.excerpt ? <Text style={s.body}>{art.excerpt}</Text> : null}
          <Text style={s.meta}>Source: {selected.sourceName ?? '—'}</Text>
          <Text style={s.meta}>Confidence: {selected.confidence ?? '—'}</Text>

          <View style={{ height: 24 }} />
          <Pressable
            style={[s.btnPrimary, { backgroundColor: C.green }]}
            onPress={() => act('publish')}
            disabled={acting}
          >
            {acting ? <ActivityIndicator color="#fff" /> : <Text style={s.btnPrimaryT}>Publish</Text>}
          </Pressable>
          <Pressable style={s.btnGhost} onPress={() => act('reject')} disabled={acting}>
            <Text style={s.btnGhostT}>Reject</Text>
          </Pressable>
        </ScrollView>
      </View>
    )
  }

  // List view
  return (
    <View style={s.screen}>
      <View style={s.header}>
        <Text style={s.headerT}>Review Queue</Text>
        <Pressable onPress={onLogout}>
          <Text style={s.logout}>Sign out</Text>
        </Pressable>
      </View>
      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        contentContainerStyle={items.length === 0 ? s.empty : { padding: 14 }}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={C.ink} />
          ) : (
            <Text style={s.emptyT}>No drafts to review. Pull to refresh.</Text>
          )
        }
        renderItem={({ item }) => {
          const art = typeof item.linkedArticle === 'object' ? item.linkedArticle : null
          return (
            <Pressable style={s.card} onPress={() => setSelected(item)}>
              <View style={[s.dot, { backgroundColor: verdictColor(item.verdict) }]} />
              <View style={{ flex: 1 }}>
                <Text style={s.cardT} numberOfLines={2}>
                  {art?.title ?? item.sourceTitle}
                </Text>
                <Text style={s.cardMeta}>
                  {(item.verdict ?? 'pending').toUpperCase()} · {item.sourceName ?? '—'}
                  {item.route === 'debunk' ? ' · DEBUNK' : ''}
                </Text>
              </View>
              <Text style={s.chev}>›</Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

// ---------- Root ----------
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export default function App() {
  const [token, setToken] = useState<string | null>(null)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    SecureStore.getItemAsync('nig_token').then((t) => {
      setToken(t)
      setBooting(false)
    })
  }, [])

  const logout = async () => {
    await SecureStore.deleteItemAsync('nig_token')
    setToken(null)
  }

  if (booting) {
    return (
      <View style={s.center}>
        <ActivityIndicator color={C.ink} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar style="dark" />
      {token ? <Queue token={token} onLogout={logout} /> : <Login onLogin={setToken} />}
    </View>
  )
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg, paddingTop: 52 },
  center: { flex: 1, backgroundColor: C.bg, justifyContent: 'center', padding: 28 },
  brand: { fontSize: 30, fontWeight: '900', color: C.ink, letterSpacing: 1, lineHeight: 34 },
  sub: { color: C.ink3, marginTop: 8, marginBottom: 28, letterSpacing: 2, textTransform: 'uppercase', fontSize: 11 },
  input: { borderWidth: 2, borderColor: C.ink, padding: 14, marginBottom: 12, fontSize: 16, color: C.ink },
  err: { color: C.red, marginBottom: 10 },
  btnPrimary: { backgroundColor: C.ink, padding: 16, alignItems: 'center', marginTop: 6 },
  btnPrimaryT: { color: '#fff', fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase', fontSize: 13 },
  btnGhost: { padding: 16, alignItems: 'center', marginTop: 8, borderWidth: 2, borderColor: C.hair },
  btnGhostT: { color: C.ink3, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', fontSize: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, paddingBottom: 12, borderBottomWidth: 2, borderBottomColor: C.ink },
  headerT: { fontSize: 22, fontWeight: '900', color: C.ink, textTransform: 'uppercase' },
  logout: { color: C.ink3, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.soft, borderWidth: 1, borderColor: C.hair, padding: 14, marginBottom: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  cardT: { fontSize: 15, fontWeight: '700', color: C.ink },
  cardMeta: { fontSize: 11, color: C.ink3, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  chev: { fontSize: 24, color: C.ink3 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyT: { color: C.ink3, textAlign: 'center' },
  back: { paddingHorizontal: 18, paddingBottom: 8 },
  backT: { color: C.red, fontWeight: '700', fontSize: 15 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, marginBottom: 12 },
  badgeT: { color: '#fff', fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  title: { fontSize: 24, fontWeight: '900', color: C.ink, lineHeight: 28 },
  body: { fontSize: 16, color: '#4a4a4a', marginTop: 12, lineHeight: 24 },
  meta: { fontSize: 12, color: C.ink3, marginTop: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
})
