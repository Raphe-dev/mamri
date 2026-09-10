export function urlHttpHttps<
  T extends {uri: (opts: {scheme: string[]}) => T; error: (msg: string) => T},
>(rule: T) {
  return rule.uri({scheme: ['http', 'https']}).error('URL http:// ou https://')
}
