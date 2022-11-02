<script lang="ts">
  import { fly } from 'svelte/transition'
  import Logo from '$lib/logo/Logo.svelte'
  import { isMenuOpen } from '$lib/stores/store'
  import type { MenuItem } from 'src/routes/layout.json'
  import AnimatedHamburger from './AnimatedHamburger.svelte'
  import NavLink from './NavLink.svelte'
  import NavMenuItem from './NavMenuItem.svelte'
  // import './nav.scss'

  export let menuItems: MenuItem[]

  let scrollY = 0
  $: scrollClass =
    scrollY > 0
      ? 'ease-out bg-argasso-700 bg-opacity-95 shadow-md backdrop-filter backdrop-blur-sm '
      : 'gradient'
</script>

<svelte:window bind:scrollY />

<nav class="sticky top-0 z-40 text-white transition-allx duration-200x ease-inx {scrollClass}">
  <div class="container main-header opacity-100 flex items-stretch justify-between h-14 z-0">
    <div class="flex items-stretch py-1 gap-5">
      <NavLink href="/" exact={true}>
        <Logo class="w-28 h-10" />
      </NavLink>
      <div class="hidden md:flex gap-5">
        <NavLink href="/boecker">Böcker</NavLink>
        <NavLink href="/information">Information</NavLink>
        <NavLink href="/studiematerial">Studiematerial</NavLink>
      </div>
    </div>
    <div class="my-auto hidden md:block">
      <div class="ml-4 flex items-center md:ml-6">
        <button
          class="p-1 border-2 mx-auto border-transparent text-gray-100 rounded-full hover:text-white  hover:bg-red-900 focus:outline-none focus:text-white focus:bg-red-900"
          aria-label="Search">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
      </div>
    </div>
    <div class="relative -mr-2 flex md:hidden">
      <AnimatedHamburger bind:open={$isMenuOpen} />
    </div>
  </div>
</nav>

{#if $isMenuOpen}
  <div
    class="absolute z-10 text-white bg-slate-800 w-screen h-screen"
    transition:fly={{ x: 300, duration: 300 }}>
    <div class="relative w-full h-full overflow-auto">
      <ul class="container list-none">
        <div class="border-b border-gray-700">
          {#each menuItems as menuItem}
            <NavMenuItem {menuItem} />
          {/each}
        </div>
      </ul>
    </div>
  </div>
{/if}
