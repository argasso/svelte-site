<script lang="ts">
  import { isOverlayOpen } from '$lib/stores/overlayStore'
  let className = ''
  export { className as class }
  export let criterias: string[]
</script>

<button class={'btn-square px-4 ' + className} on:click={() => isOverlayOpen.set(true)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns-xlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="289.984"
    height="289.984"
    viewBox="0 0 289.984 289.984"
    xml-space="preserve"
    class="h-4 w-4 mr-2">
    <defs />
    <g
      id="icon"
      class="basestyle style2"
      transform="translate(-1.611022222222232 -1.611022222222232) scale(3.22 3.22)">
      <path
        d="M 15.205 90 c -1.104 0 -2 -0.896 -2 -2 V 55.115 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 17.205 89.104 16.31 90 15.205 90 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 74.795 59.357 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 55.357 C 76.795 58.462 75.899 59.357 74.795 59.357 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 45 90 c -1.104 0 -2 -0.896 -2 -2 V 27.922 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 47 89.104 46.104 90 45 90 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 45 29.922 c -5.464 0 -9.91 -4.445 -9.91 -9.91 s 4.445 -9.91 9.91 -9.91 c 5.465 0 9.91 4.445 9.91 9.91 S 50.465 29.922 45 29.922 z M 45 14.103 c -3.259 0 -5.91 2.651 -5.91 5.91 s 2.651 5.91 5.91 5.91 s 5.91 -2.651 5.91 -5.91 S 48.259 14.103 45 14.103 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 15.205 57.115 c -5.464 0 -9.91 -4.445 -9.91 -9.91 c 0 -5.464 4.445 -9.91 9.91 -9.91 s 9.91 4.445 9.91 9.91 C 25.115 52.67 20.669 57.115 15.205 57.115 z M 15.205 41.295 c -3.259 0 -5.91 2.651 -5.91 5.91 s 2.651 5.91 5.91 5.91 s 5.91 -2.651 5.91 -5.91 S 18.464 41.295 15.205 41.295 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 74.795 75.177 c -5.464 0 -9.909 -4.445 -9.909 -9.91 c 0 -5.464 4.445 -9.909 9.909 -9.909 c 5.465 0 9.91 4.445 9.91 9.909 C 84.705 70.731 80.26 75.177 74.795 75.177 z M 74.795 59.357 c -3.259 0 -5.909 2.65 -5.909 5.909 s 2.65 5.91 5.909 5.91 s 5.91 -2.651 5.91 -5.91 S 78.054 59.357 74.795 59.357 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 15.205 41.295 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 37.295 C 17.205 40.4 16.31 41.295 15.205 41.295 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 45 14.103 c -1.104 0 -2 -0.896 -2 -2 V 2 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 v 10.103 C 47 13.207 46.104 14.103 45 14.103 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
      <path
        d="M 74.795 90 c -1.104 0 -2 -0.896 -2 -2 V 73.177 c 0 -1.104 0.896 -2 2 -2 s 2 0.896 2 2 V 88 C 76.795 89.104 75.899 90 74.795 90 z"
        class="basestyle style"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round" />
    </g>
  </svg>
  Filtrera
  {#if criterias.length > 0}
    <span class="text-gray-400 ml-1">({criterias.length})</span>
  {/if}
</button>

<style>
  .basestyle {
    stroke: 'none';
    stroke-width: 2;
    stroke-dasharray: 'none';
    stroke-linecap: 'butt';
    stroke-linejoin: 'miter';
    stroke-miterlimit: 10;
    fill: rgb(0, 0, 0);
    fill-rule: 'nonzero';
    opacity: 1;
  }

  .style {
    fill: rgb(0, 0, 0);
  }
  .style2 {
    fill: 'none';
  }
</style>
