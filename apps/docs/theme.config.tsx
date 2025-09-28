import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <span>🛠️ Forge CMMS Docs</span>,
  project: {
    link: 'https://github.com/Forge-CMMS/forge',
  },
  docsRepositoryBase: 'https://github.com/Forge-CMMS/forge/tree/main/apps/docs',
  footer: {
    text: 'Forge CMMS Documentation',
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Forge CMMS'
      }
    }
  },
  head: () => {
    return (
      <>
        <meta property="og:title" content="Forge CMMS Documentation" />
        <meta property="og:description" content="Extensible maintenance platform with plug-and-play modules" />
      </>
    )
  }
}

export default config