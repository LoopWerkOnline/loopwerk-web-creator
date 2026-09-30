<?xml version="1.0" encoding="UTF-8"?>
<!-- Opmaak van /sitemap.xml in de browser. Zoekmachines lezen de XML zelf en negeren dit bestand. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="nl">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap LoopWerk</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif&amp;family=Instrument+Sans:wght@400;500;600&amp;display=swap"/>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; background: #fcf5ed; color: #1f241f; font-family: "Instrument Sans", system-ui, sans-serif; line-height: 1.55; }
          main { max-width: 880px; margin: 0 auto; padding: 56px 20px 80px; }
          .eyebrow { font-size: 12px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #b07a5a; margin: 0; }
          h1 { font-family: "Instrument Serif", Georgia, serif; font-weight: 400; font-size: 48px; line-height: 1.1; margin: 16px 0 12px; }
          .lead { margin: 0; color: rgba(31,36,31,.72); font-size: 17px; }
          .count { display: inline-block; margin-top: 20px; padding: 6px 14px; border-radius: 999px; background: #f5ede1; border: 1px solid #e5ddd0; font-size: 14px; }
          section { margin-top: 36px; background: #f5ede1; border: 1px solid #e5ddd0; border-radius: 16px; padding: 24px; }
          h2 { font-family: "Instrument Serif", Georgia, serif; font-weight: 400; font-size: 28px; margin: 0 0 12px; }
          table { width: 100%; border-collapse: collapse; font-size: 15px; }
          th { text-align: left; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: rgba(31,36,31,.55); padding: 8px 0; border-bottom: 1px solid #e5ddd0; }
          td { padding: 10px 0; border-bottom: 1px solid #e5ddd0; vertical-align: top; }
          tr:last-child td { border-bottom: 0; }
          td.date { white-space: nowrap; text-align: right; color: rgba(31,36,31,.65); padding-left: 16px; }
          th.date { text-align: right; }
          a { color: #1f241f; text-decoration: none; word-break: break-all; }
          a:hover { color: #b07a5a; text-decoration: underline; text-underline-offset: 3px; }
          footer { margin-top: 40px; font-size: 13px; color: rgba(31,36,31,.55); }
          footer a { color: #b07a5a; text-decoration: underline; }
          @media (max-width: 560px) { h1 { font-size: 36px; } section { padding: 18px; } }
        </style>
      </head>
      <body>
        <main>
          <p class="eyebrow">LoopWerk</p>
          <h1>Sitemap LoopWerk</h1>
          <p class="lead">Overzicht van alle pagina's voor zoekmachines.</p>
          <span class="count"><xsl:value-of select="count(sm:urlset/sm:url)"/> pagina's</span>

          <xsl:call-template name="section">
            <xsl:with-param name="title">Algemeen</xsl:with-param>
            <xsl:with-param name="urls" select="sm:urlset/sm:url[not(contains(sm:loc,'/oplossingen/')) and not(contains(sm:loc,'/cases/')) and not(contains(sm:loc,'/blog/')) and not(contains(sm:loc,'/privacy')) and not(contains(sm:loc,'/cookies'))]"/>
          </xsl:call-template>
          <xsl:call-template name="section">
            <xsl:with-param name="title">Oplossingen</xsl:with-param>
            <xsl:with-param name="urls" select="sm:urlset/sm:url[contains(sm:loc,'/oplossingen/')]"/>
          </xsl:call-template>
          <xsl:call-template name="section">
            <xsl:with-param name="title">Cases</xsl:with-param>
            <xsl:with-param name="urls" select="sm:urlset/sm:url[contains(sm:loc,'/cases/')]"/>
          </xsl:call-template>
          <xsl:call-template name="section">
            <xsl:with-param name="title">Blog</xsl:with-param>
            <xsl:with-param name="urls" select="sm:urlset/sm:url[contains(sm:loc,'/blog/')]"/>
          </xsl:call-template>
          <xsl:call-template name="section">
            <xsl:with-param name="title">Juridisch</xsl:with-param>
            <xsl:with-param name="urls" select="sm:urlset/sm:url[contains(sm:loc,'/privacy') or contains(sm:loc,'/cookies')]"/>
          </xsl:call-template>

          <footer>Liever een leesbaar overzicht? Bekijk de <a href="/sitemap">sitemap voor bezoekers</a>.</footer>
        </main>
      </body>
    </html>
  </xsl:template>

  <xsl:template name="section">
    <xsl:param name="title"/>
    <xsl:param name="urls"/>
    <xsl:if test="count($urls) &gt; 0">
      <section>
        <h2><xsl:value-of select="$title"/></h2>
        <table>
          <thead>
            <tr><th>Pagina</th><th class="date">Laatst bijgewerkt</th></tr>
          </thead>
          <tbody>
            <xsl:for-each select="$urls">
              <tr>
                <td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
                <td class="date">
                  <xsl:variable name="d" select="sm:lastmod"/>
                  <xsl:value-of select="concat(substring($d,9,2),'-',substring($d,6,2),'-',substring($d,1,4))"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </section>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>
