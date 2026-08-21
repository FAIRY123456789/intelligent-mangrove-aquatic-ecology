import { describe, expect, it } from 'vitest'
import { events, getEvents, getLeaderProjects, getProjects, getShares, leaderProfiles, locales, nav, pages, publications } from '../../data/site'
describe('public-site content', () => {
  it('has the same public navigation in every locale', () => { for (const locale of locales) expect(nav[locale].map(item => item.key)).toEqual(nav.zh.map(item => item.key)) })
  it('uses compact grouped navigation without a research-sharing top-level entry', () => {
    expect(nav.zh.map(item => item.key)).toEqual(['about', 'projects', 'news', 'join', 'contact'])
    expect(nav.zh.find(item => item.key === 'projects')?.label).toBe('科研成果')
    expect(nav.en.find(item => item.key === 'projects')?.label).toBe('Outcomes')
    expect(nav.zh.find(item => item.key === 'about')?.children?.map(item => item.key)).toEqual(['people/liruili', 'about', 'research'])
    expect(nav.zh.find(item => item.key === 'about')?.children?.map(item => item.label)).toEqual(['团队负责人', '团队介绍', '研究方向'])
    expect(nav.zh.find(item => item.key === 'projects')?.children?.map(item => item.key)).toEqual(['projects', 'publications', 'platforms'])
    expect(nav.zh.map(item => String(item.key))).not.toContain('sharing')
  })
  it('provides a title and lead for every routed public page', () => { for (const locale of locales) for (const page of Object.values(pages[locale])) { expect(page.title.length).toBeGreaterThan(0); expect(page.lead.length).toBeGreaterThan(0) } })
  it('keeps DOI links traceable', () => expect(publications.every(item => item.doi.includes('/'))).toBe(true))
  it('publishes a responsible lead for every listed research project', () => {
    for (const locale of locales) {
      expect(getProjects(locale).every(item => item.leader.length > 0)).toBe(true)
    }
  })
  it('links every research-sharing item directly to a final external page', () => {
    for (const locale of locales) {
      expect(getShares(locale).every(item => /^https?:\/\//.test(item.url))).toBe(true)
      expect(getShares(locale).some(item => item.url.includes('/sharing'))).toBe(false)
    }
  })
  it('keeps the complete group-leader profile aligned across all locales', () => {
    for (const locale of locales) {
      expect(getLeaderProjects(locale)).toHaveLength(12)
      expect(leaderProfiles[locale].awards).toHaveLength(3)
      expect(leaderProfiles[locale].research).toHaveLength(4)
      expect(leaderProfiles[locale].contact).toHaveLength(4)
      expect(leaderProfiles[locale].sourceIds.length).toBeGreaterThan(0)
    }
  })
  it('publishes complete, direct and localised news records', () => {
    expect(events.length).toBeGreaterThanOrEqual(8)
    expect(events.length).toBeLessThanOrEqual(15)
    for (const locale of locales) {
      const records = getEvents(locale)
      expect(records).toHaveLength(events.length)
      expect(records.every(item =>
        /^\d{4}\.\d{2}\.\d{2}$/.test(item.date)
        && item.title.length > 0
        && item.place.length > 0
        && item.type.length > 0
        && item.summary.length > 0
        && /^https?:\/\//.test(item.url),
      )).toBe(true)
    }
  })
})
