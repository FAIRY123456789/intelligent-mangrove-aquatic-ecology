<script setup lang="ts">
import { localeMeta, type Locale } from '~/data/site'

const props = defineProps<{ locale: Locale }>()
const copy = computed(() => ({
  zh: {
    contact: '联系方式',
    address: '联系地址',
    addressText: '深圳市南山区西丽深圳大学城北京大学深圳研究生院 E304 室',
  },
  en: {
    contact: 'Contact',
    address: 'Contact Address',
    addressText: 'Room E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Nanshan District, Shenzhen',
  },
  id: {
    contact: 'Kontak',
    address: 'Alamat',
    addressText: 'Ruang E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Distrik Nanshan, Shenzhen',
  },
  ar: {
    contact: 'الاتصال',
    address: 'العنوان',
    addressText: 'الغرفة E304، كلية الدراسات العليا بجامعة بكين في شنتشن، مدينة شنتشن الجامعية، نانشان، شنتشن',
  },
  pt: {
    contact: 'Contato',
    address: 'Endereço',
    addressText: 'Sala E304, Escola de Pós-Graduação de Shenzhen da Universidade de Pequim, Cidade Universitária de Shenzhen, Nanshan, Shenzhen',
  },
})[props.locale])
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h2>{{ localeMeta[locale].name }}</h2>
        <p class="footer-team-tagline">{{ localeMeta[locale].tagline }}</p>
      </div>
      <div>
        <h2>{{ copy.contact }}</h2>
        <div class="footer-contact-row">
          <a href="mailto:liruili@pkusz.edu.cn">liruili@pkusz.edu.cn</a>
          <a href="tel:+8675526033141">+86 (0)755 26033141</a>
        </div>
      </div>
      <div>
        <h2>{{ copy.address }}</h2>
        <p>{{ copy.addressText }}</p>
      </div>
    </div>
    <div class="footer-bottom container">© {{ new Date().getFullYear() }} {{ localeMeta[locale].name }}</div>
  </footer>
</template>
