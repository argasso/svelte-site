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
    <ul class="container list-none" class:open={$isMenuOpen}>
      {#each menuItems as menuItem}
        <NavMenuItem {menuItem} />
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .navX {
    position: absolute;
    z-index: 1;
    list-style: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    /* align-items: center; */
    background: #272727;
    padding: 55px 2rem;
  }

  .nav-links-top {
    display: flex;
    align-items: stretch;
    list-style: none;

    @media screen and (max-width: 767px) {
      position: absolute;
      top: 0;
      left: 0;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      padding: 55px 2rem;
      width: 100vw;
      height: 100vh;
      color: #fff;
      background: #272727;
      transition: opacity 0.4s 0.05s, clip-path 0.5s 0.05s;
      overflow-y: auto;
      opacity: 0;
      clip-path: circle(200px at top right);

      &.open {
        opacity: 1;
        clip-path: circle(100% at center);
      }
    }
  }

  .menu-icon {
    position: relative;
    padding: 26px 10px;
    cursor: pointer;
    z-index: 1;
    display: none;

    &__line {
      display: block;
      position: relative;
      background: #fff;
      height: 2px;
      width: 20px;
      border-radius: 4px;
      transition: background 0.8s ease;

      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 4px;
        background: #fff;
        transition: background 0.8s ease;
      }

      &::before {
        transform: translateY(-5px);
      }

      &::after {
        transform: translateY(5px);
      }
    }
  }

  .menu-btn {
    position: absolute;
    top: -100px;

    &:focus ~ .menu-icon {
      .menu-icon__line {
        &::before {
          transform: translateY(-7px);
        }

        &::after {
          transform: translateY(7px);
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    .main-header {
      .menu-icon {
        display: block;

        &__line {
          animation: closedMid 0.8s backwards;
          animation-direction: reverse;

          &::before {
            animation: closedTop 0.8s backwards;
            animation-direction: reverse;
          }

          &::after {
            animation: closedBtm 0.8s backwards;
            animation-direction: reverse;
          }
        }
      }

      .nav-links {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 10rem 0;
        width: 100vw;
        height: 100vh;
        font-size: 2rem;
        color: #fff;
        background: #272727;
        transition: opacity 0.8s 0.5s, clip-path 1s 0.5s;
        clip-path: circle(200px at top right);

        .nav-link {
          opacity: 0;
          transform: translateX(100%);
          width: 100%;
          text-align: center;

          a {
            display: block;
            padding: 2rem 0;
          }
        }
      }

      .menu-btn:checked ~ .nav-links {
        opacity: 1;
        clip-path: circle(100% at center);

        .nav-link {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.4s ease-in-out,
            transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);

          &:nth-of-type(1) {
            transition-delay: 0.7s;
          }

          &:nth-of-type(2) {
            transition-delay: 0.8s;
          }

          &:nth-of-type(3) {
            transition-delay: 0.9s;
          }

          &:nth-of-type(4) {
            transition-delay: 1s;
          }
        }
      }

      .menu-btn:checked ~ .menu-icon {
        border-radius: 50%;
        animation: pulse 1s;

        .menu-icon__line {
          background: #fff;
          animation: openMid 0.8s forwards;

          &::before {
            background: #fff;
            animation: openTop 0.8s forwards;
          }

          &::after {
            background: #fff;
            animation: openBtm 0.8s forwards;
          }
        }
      }
    }
  }
  /* a {
    @apply text-white;
    @apply flex;
    @apply m-1;
    @apply px-3;
  } */
</style>
