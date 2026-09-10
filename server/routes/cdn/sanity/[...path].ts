export default defineEventHandler((event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  const url = getRequestURL(event)
  const suffix = url.pathname.replace(/^\/cdn\/sanity(?=\/|$)/, '')
  if (!suffix.startsWith('/images/') || suffix.includes('..')) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }

  return sendProxy(event, `https://cdn.sanity.io${suffix}${url.search}`, {
    onResponse(e) {
      e.node.res.removeHeader('set-cookie')
    }
  })
})
