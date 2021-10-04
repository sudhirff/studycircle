<template>
    <!-- BEGIN: Side Menu -->
    <nav class="side-nav">
        <ul>
        <!-- BEGIN: First Child -->
            <template v-for="(menu, menuKey) in formattedMenu">
                <li
                    v-if="menu == 'devider'"
                    :key="menu + menuKey"
                    class="side-nav__devider my-6"
                    ></li>
                <li v-else :key="menu + menuKey">
                    <TheSideMenuTooltip
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
                            {{ $tc('navs.'+menu.title) }}
                        <div
                            v-if="menu.subMenu"
                            class="side-menu__sub-icon"
                            :class="{ 'transform rotate-180': menu.activeDropdown }"
                        >
                            <ChevronDownIcon />
                        </div>
                    </div>
                </TheSideMenuTooltip>
                <!-- BEGIN: Second Child -->
                <transition @enter="enter" @leave="leave">
                    <ul v-if="menu.subMenu && menu.activeDropdown">
                        <li
                            v-for="(subMenu, subMenuKey) in menu.subMenu"
                            :key="subMenuKey"
                        >
                            <TheSideMenuTooltip
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
                                    {{ $tc("navs."+subMenu.title) }}
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
                            </TheSideMenuTooltip>
                            <!-- BEGIN: Third Child -->
                            <transition @enter="enter" @leave="leave">
                                <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                                    <li
                                    v-for="(lastSubMenu,
                                    lastSubMenuKey) in subMenu.subMenu"
                                    :key="lastSubMenuKey"
                                    >
                                    <TheSideMenuTooltip
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
                                            {{ $tc("navs."+lastSubMenu.title) }}
                                        </div>
                                    </TheSideMenuTooltip>
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

<style scoped>
.logo {
    top: 15px;
}

.side-nav {
    width: 275px;
}
</style>