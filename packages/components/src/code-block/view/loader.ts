/* Copyright 2021, Milkdown by Mirone. */
import type { LanguageDescription, LanguageSupport } from '@codemirror/language'

export type LanguageInfo = {
  name: string
  alias: readonly string[]
}

export class LanguageLoader {
  private readonly map: Record<string, LanguageDescription>

  constructor(private languages: LanguageDescription[]) {
    this.map = {}

    languages.forEach((language) => {
      language.alias.forEach((alias) => {
        this.map[alias] = language
      })
    })
  }

  getAll(): LanguageInfo[] {
    return this.languages.map((language): LanguageInfo => {
      return {
        name: language.name,
        alias: language.alias,
      }
    })
  }

  load(languageName: string): Promise<LanguageSupport | undefined> {
    const languageMap = this.map
    const language = languageMap[languageName.toLowerCase()]

    if (!language)
      return Promise.resolve(undefined)

    if (language.support)
      return Promise.resolve(language.support)

    return language.load()
  }
}
