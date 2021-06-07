<!-- BEGIN: First Child -->
            <template v-for="(menu, menuKey) in formattedMenu">
            <li
                v-if="menu == 'devider'"
                :key="menu + menuKey"
                class="side-nav__devider my-6"
            ></li>
            <li v-else :key="menu + menuKey">
                <SideMenuTooltip
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
                </SideMenuTooltip>
                <!-- BEGIN: Second Child -->
                <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                    <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                    >
                    <SideMenuTooltip
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
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                        <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li
                            v-for="(lastSubMenu,
                            lastSubMenuKey) in subMenu.subMenu"
                            :key="lastSubMenuKey"
                        >
                            <SideMenuTooltip
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
                            </SideMenuTooltip>
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