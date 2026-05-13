# Privacy Policy — The New India Government

## Data We Collect

### When You Vote
- We compute `SHA-256(VOTE_SALT | ip | userAgent | "vote-poll-v1")` to detect duplicate votes
- **Raw IP addresses are never stored**
- We store only the hash (non-reversible) and the country derived from the IP (`ipCountry`)
- Your vote option is stored (yes/no/undecided)
- A `localStorage` flag is set in your browser to indicate you have voted

### When You Submit a Voice
- Your submitted text (up to 1000 characters)
- Optional display name (defaults to "Anonymous")
- Your vote option (if applicable)
- Status: pending until a moderator approves

### When You Sign a Petition
- First name, last name, city (required)
- Optional comment
- `displayPublic` flag: if false, your name/comment will NOT appear publicly
- We compute `SHA-256(VOTE_SALT | petitionId | ip | userAgent | "petition-sign-v1")` to prevent duplicate signatures
- **Raw IP addresses are never stored**

### When You Subscribe to the Newsletter
- Email address only
- Source (e.g. "homepage")
- **Never sold or shared with third parties**

## Cookies and Local Storage

- `ngi:voted` — a localStorage flag indicating you have cast a vote. Not a cookie. Not transmitted to the server.
- No tracking cookies.
- No third-party analytics by default.

## Cloudflare Turnstile

We use Cloudflare Turnstile for bot protection on forms. Turnstile is a privacy-preserving alternative to reCAPTCHA. See [Cloudflare's privacy policy](https://www.cloudflare.com/privacypolicy/).

## Data Retention

- Votes, voices, and petition signatures are retained indefinitely for record-keeping
- Newsletter subscribers can unsubscribe at any time
- Contact `editorial@thenewindiagov.test` to request deletion of your data

## Technical Implementation

All hashing uses Node.js's built-in `crypto.createHash('sha256')`. The salt (`VOTE_SALT`) is a secret environment variable that makes hashes unguessable by third parties.

```
voterHash = SHA-256(VOTE_SALT + "|" + ip + "|" + userAgent + "|" + purpose)
```

This hash:
- Is unique per IP+UA+purpose combination
- Cannot be reversed to find the original IP
- Cannot be linked across different purposes (vote vs. petition)
