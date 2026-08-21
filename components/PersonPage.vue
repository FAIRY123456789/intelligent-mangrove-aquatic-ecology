<script setup lang="ts">
import { getLeaderProjects, leaderProfiles, type Locale } from '~/data/site'

const props = defineProps<{ locale: Locale }>()
const publicAsset = usePublicAsset()
const profile = computed(() => leaderProfiles[props.locale])
const projectItems = computed(() => getLeaderProjects(props.locale))
</script>

<template>
  <div class="app-shell">
    <SeoMeta :locale="locale" :title="profile.name" :description="profile.seo" />
    <SiteHeader :locale="locale" />

    <main id="main">
      <section class="page-hero person-hero">
        <div class="container">
          <p class="eyebrow">{{ profile.role }}</p>
          <h1>{{ profile.name }}</h1>
          <p>{{ profile.labels.research }}</p>
          <div class="page-line" />
        </div>
      </section>

      <section class="section container person-layout">
        <aside class="person-sidebar">
          <img
            class="leader-photo"
            :src="publicAsset('/images/people/li-ruili.jpg')"
            alt="李瑞利研究员在红树林野外调查现场"
            width="567"
            height="567"
          >
          <div class="leader-contact">
            <strong>{{ profile.name }}</strong>
            <span>{{ profile.contact[0] }}</span>
            <span>{{ profile.contact[1] }}</span>
            <a href="tel:+8675526033141">{{ profile.contact[2] }}</a>
            <a href="mailto:liruili@pkusz.edu.cn">{{ profile.contact[3] }}</a>
          </div>
        </aside>

        <article class="profile academic-profile">
          <section>
            <h2>{{ profile.labels.intro }}</h2>
            <p v-for="paragraph in profile.intro" :key="paragraph">{{ paragraph }}</p>
          </section>

          <section>
            <h2>{{ profile.labels.education }}</h2>
            <ol class="timeline-list">
              <li v-for="item in profile.education" :key="item">{{ item }}</li>
            </ol>
          </section>

          <section>
            <h2>{{ profile.labels.appointments }}</h2>
            <ul class="compact-list">
              <li v-for="item in profile.appointments" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2>{{ profile.labels.research }}</h2>
            <ol class="numbered-list">
              <li v-for="(item, index) in profile.research" :key="item">
                <span>0{{ index + 1 }}</span>{{ item }}
              </li>
            </ol>
          </section>

          <section>
            <h2>{{ profile.labels.contributions }}</h2>
            <ul class="compact-list contributions-list">
              <li v-for="item in profile.contributions" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2>{{ profile.labels.projects }}</h2>
            <div class="leader-project-table" role="table" :aria-label="profile.labels.projects">
              <div class="leader-project-head" role="row">
                <span role="columnheader">{{ profile.labels.year }}</span>
                <span role="columnheader">{{ profile.labels.type }}</span>
                <span role="columnheader">{{ profile.labels.project }}</span>
                <span role="columnheader">{{ profile.labels.status }}</span>
                <span role="columnheader">{{ profile.labels.role }}</span>
              </div>
              <div v-for="project in projectItems" :key="`${project.year}-${project.title}`" class="leader-project-row" role="row">
                <span role="cell" :data-label="profile.labels.year">{{ project.year }}</span>
                <span role="cell" :data-label="profile.labels.type">{{ project.type }}</span>
                <strong role="cell" :data-label="profile.labels.project">{{ project.title }}</strong>
                <span role="cell" :data-label="profile.labels.status">{{ project.status }}</span>
                <span role="cell" :data-label="profile.labels.role">{{ project.role }}</span>
              </div>
            </div>
          </section>

          <section>
            <h2>{{ profile.labels.awards }}</h2>
            <ol class="timeline-list">
              <li v-for="item in profile.awards" :key="item">{{ item }}</li>
            </ol>
          </section>

          <section>
            <h2>{{ profile.labels.outputs }}</h2>
            <ul class="compact-list">
              <li v-for="item in profile.outputs" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section>
            <h2>{{ profile.labels.students }}</h2>
            <p>{{ profile.students }}</p>
          </section>

          <section>
            <h2>{{ profile.labels.recruitment }}</h2>
            <ol class="numbered-list">
              <li v-for="(item, index) in profile.recruitment" :key="item">
                <span>0{{ index + 1 }}</span>{{ item }}
              </li>
            </ol>
          </section>

          <section>
            <h2>{{ profile.labels.contact }}</h2>
            <address class="profile-address">
              <span>{{ profile.contact[0] }}</span>
              <span>{{ profile.contact[1] }}</span>
              <a href="tel:+8675526033141">{{ profile.contact[2] }}</a>
              <a href="mailto:liruili@pkusz.edu.cn">{{ profile.contact[3] }}</a>
            </address>
          </section>
        </article>
      </section>
    </main>

    <SiteFooter :locale="locale" />
  </div>
</template>
