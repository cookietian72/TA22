<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import type { EduItem } from "./EduCarousel.vue";

const props = defineProps<{ item: EduItem | null }>();
const emit = defineEmits<{ (e: "close"): void }>();

const open = computed(() => !!props.item);
</script>

<template>
  <!-- 背景遮罩 -->
  <transition name="fade">
    <div v-if="open" class="backdrop" @click="emit('close')" />
  </transition>

  <!-- 右侧抽屉 -->
  <transition name="slide">
    <aside v-if="open" class="panel">
      <header>
        <div class="title">
          <img :src="item!.img" :alt="item!.title" />
          <div>
            <h3>{{ item!.title }}</h3>
            <p v-if="item!.pron" class="pron">{{ item!.pron }}</p>
          </div>
        </div>
        <button class="x" @click="emit('close')">✕</button>
      </header>

      <section class="content">
        <p class="big">{{ item!.blurb }}</p>
        <p class="hint">Swipe/Scroll for more content…</p>
      </section>
    </aside>
  </transition>
</template>

<style scoped>
.backdrop {
  position: fixed; inset: 0; background: rgba(15,23,42,.45); backdrop-filter: blur(2px);
}
.panel {
  position: fixed; top: 0; right: 0; height: 100vh; width: min(520px, 92vw);
  background: white; box-shadow: -8px 0 30px rgba(0,0,0,.18);
  display: flex; flex-direction: column;
}
header {
  display:flex; align-items:center; justify-content: space-between;
  padding: 16px 18px; border-bottom: 1px solid #eef2f7;
}
.title { display:flex; align-items:center; gap: 12px; }
.title img { width: 56px; height: 56px; object-fit: contain; }
.title h3 { margin: 0; font-size: 20px; }
.pron { margin: 2px 0 0; color:#64748b; font-size: 13px; }
.x { border:0; background:transparent; font-size: 20px; cursor:pointer; padding:6px; }

.content { padding: 16px 18px; overflow: auto; }
.big { font-size: 16px; color:#334155; line-height: 1.6; }
.hint { color:#94a3b8; font-size: 12px; margin-top: 16px; }

.fade-enter-active, .fade-leave-active { transition: opacity .16s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform .22s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
