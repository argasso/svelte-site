<script lang="ts">
  import Logo from '$lib/logo/Logo.svelte'
  import NavLink from './NavLink.svelte'

  let open = false
  let scrollY = 0
  let scrollClass = ''
  $: scrollClass =
    scrollY > 0
      ? 'ease-out bg-argasso-700 bg-opacity-95 shadow-md backdrop-filter backdrop-blur-sm '
      : 'gradient'
</script>

<svelte:window bind:scrollY />

<nav class="sticky top-0 z-50 text-white transition-allx duration-200x ease-inx {scrollClass}">
  <div class="container opacity-100 flex items-stretch justify-between h-14">
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
    <div class="-mr-2 flex md:hidden">
      <!-- Mobile menu button -->
      <button
        class="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-red-900 focus:bg-red-900 focus:text-white">
        <svg
          class={`${open ? 'hidden' : 'block'} h-6 w-6`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          class={`${open ? 'block' : 'hidden'} h-6 w-6`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
  <div class={`${open ? 'block' : 'hidden'} md:hidden `}>
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <a
        href="/boecker"
        class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">
        Böcker
      </a>

      <a
        href="/information"
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
        Information
      </a>

      <a
        href="/studiematerial"
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
        Studiematerial
      </a>
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <div class="flex items-center px-5 space-x-3">
        <div class="flex-shrink-0">
          <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" />
        </div>
        <div class="space-y-1">
          <div class="text-base font-medium leading-none text-white">Tom Cook</div>
          <div class="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
        </div>
      </div>
      <div class="mt-3 px-2 space-y-1">
        <a
          href="/boecker"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Böcker
        </a>

        <a
          href="/information"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Information
        </a>

        <a
          href="/studiematerial"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
          Studiematerial
        </a>
      </div>
    </div>
  </div>
</nav>

<style>
  /* a {
    @apply text-white;
    @apply flex;
    @apply m-1;
    @apply px-3;
  } */
</style>
