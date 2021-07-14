<template>
    <div>
    <!-- BEGIN: Side Menu -->
        <nav class="side-nav">
            <router-link to="/" class="intro-x flex items-center pl-5 pt-4 mt-3">
                <img
                    alt="Studycircle"
                    class="w-6"
                    :src="getImage('logo.svg')"
                    />
                <span class="hidden xl:block text-white text-lg ml-3">
                Study<span class="font-medium">Circle</span>
                </span>
            </router-link>
            <div class="side-nav__devider my-6"></div>
            <ul>
                <!-- BEGIN: First Child -->
                <template v-for="(menu, menuKey) in formattedMenu">
                    <li
                        v-if="menu == 'devider'"
                        :key="menu + menuKey"
                        class="side-nav__devider my-6"
                    ></li>
                    <li v-else :key="menu + menuKey">
                        <the-side-menu-tooltip
                        tag="a"
                        :content="menu.title"
                        :href="
                            menu.subMenu
                            ? 'javascript:;'
                            : router.resolve({ name: menu.pageName }).path
                        "
                        class="side-menu"
                        :class="{
                            'side-menu--active': menu.active,
                            'side-menu--open': menu.activeDropdown
                        }"
                        @click="linkTo(menu, router, $event)"
                        >
                        <div class="side-menu__icon">
                            <component :is="menu.icon" />
                        </div>
                        <div class="side-menu__title">
                            {{ menu.title }}
                            <div
                            v-if="menu.subMenu"
                            class="side-menu__sub-icon"
                            :class="{ 'transform rotate-180': menu.activeDropdown }"
                            >
                            <ChevronDownIcon />
                            </div>
                        </div>
                        </the-side-menu-tooltip>
                        <!-- BEGIN: Second Child -->
                        <transition @enter="enter" @leave="leave">
                            <ul v-if="menu.subMenu && menu.activeDropdown">
                                <li
                                v-for="(subMenu, subMenuKey) in menu.subMenu"
                                :key="subMenuKey"
                                >
                                <the-side-menu-tooltip
                                    tag="a"
                                    :content="subMenu.title"
                                    :href="
                                    subMenu.subMenu
                                        ? 'javascript:;'
                                        : router.resolve({ name: subMenu.pageName }).path
                                    "
                                    class="side-menu"
                                    :class="{ 'side-menu--active': subMenu.active }"
                                    @click="linkTo(subMenu, router, $event)"
                                >
                                    <div class="side-menu__icon">
                                    <ActivityIcon />
                                    </div>
                                    <div class="side-menu__title">
                                    {{ subMenu.title }}
                                    <div
                                        v-if="subMenu.subMenu"
                                        class="side-menu__sub-icon"
                                        :class="{
                                        'transform rotate-180': subMenu.activeDropdown
                                        }"
                                    >
                                        <ChevronDownIcon />
                                    </div>
                                    </div>
                                </the-side-menu-tooltip>
                                <!-- BEGIN: Third Child -->
                                <transition @enter="enter" @leave="leave">
                                    <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                                    <li
                                        v-for="(lastSubMenu,
                                        lastSubMenuKey) in subMenu.subMenu"
                                        :key="lastSubMenuKey"
                                    >
                                        <the-side-menu-tooltip
                                        tag="a"
                                        :content="lastSubMenu.title"
                                        :href="
                                            lastSubMenu.subMenu
                                            ? 'javascript:;'
                                            : router.resolve({
                                                name: lastSubMenu.pageName
                                                }).path
                                        "
                                        class="side-menu"
                                        :class="{
                                            'side-menu--active': lastSubMenu.active
                                        }"
                                        @click="linkTo(lastSubMenu, router, $event)"
                                        >
                                        <div class="side-menu__icon">
                                            <ZapIcon />
                                        </div>
                                        <div class="side-menu__title">
                                            {{ lastSubMenu.title }}
                                        </div>
                                        </the-side-menu-tooltip>
                                    </li>
                                    </ul>
                                    </transition>
                                <!-- END: Third Child -->
                                </li>
                            </ul>
                        </transition>
                        <!-- END: Second Child -->
                    </li>
                </template>
                <!-- END: First Child -->
            </ul>
        </nav>
      <!-- END: Side Menu -->
    </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { helper as $h } from '@/utils/helper'
import TheSideMenuTooltip from '@/components/layouts/TheSideMenuTooltip'
import { linkTo, nestedMenu, enter, leave } from '@/components/index'

export default defineComponent({
  components: {
    TheSideMenuTooltip
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const formattedMenu = ref([])
    const sideMenu = computed(() =>
      nestedMenu(store.state.sideMenu.menu, route)
    )

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = $h.toRaw(sideMenu.value)
      }
    )

    onMounted(() => {
      formattedMenu.value = $h.toRaw(sideMenu.value)
    })

    return {
      formattedMenu,
      router,
      linkTo,
      enter,
      leave
    }
  },
  methods: {
      getImage(image)
      {
          return '/owner/images/' + image;
      }
  }
})
</script>