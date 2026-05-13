import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import { importMap } from './admin/importMap.js'
import React from 'react'
import type { ServerFunctionClient } from 'payload'

type Args = {
  children: React.ReactNode
}

const serverFunctions: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({ ...args, config: configPromise, importMap })
}

export default function AdminLayout({ children }: Args) {
  return RootLayout({ children, config: configPromise, importMap, serverFunction: serverFunctions })
}
