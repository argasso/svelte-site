<script>
  import { browser } from '$app/env'
  import ShareIcon from '$lib/components/Icons/Share.svelte'
  import Facebook from '$lib/share/Facebook.svelte'
  import Twitter from '$lib/share/Twitter.svelte'
  import Whatsapp from '$lib/share/Whatsapp.svelte'

  const siteTitle = 'Argasso Bokförlag',
    siteUrl = 'https://argasso.se'

  export let slug
  export let title

  $: webShareAPISupported = browser && typeof navigator.share !== 'undefined'

  $: handleWebShare
  const handleWebShare = async () => {
    try {
      navigator.share({
        title,
        text: `Shared from ${siteTitle}`,
        url,
      })
    } catch (error) {
      webShareAPISupported = false
    }
  }
  const url = `${siteUrl}/${slug}`
</script>

<aside class="container">
  <div class="wrapper">
    Share: <div class="buttons">
      {#if webShareAPISupported}
        <button on:click={handleWebShare}
          ><span class="screen-reader-text">Share</span><ShareIcon width={48} /></button>
      {:else}
        <Twitter {url} {title} /><Facebook {url} /><Whatsapp {url} {title} />
      {/if}
    </div>
  </div>
</aside>

<style>
  .container {
    display: flex;
    flex-direction: row;
    @apply mt-6
    /* margin-top: $spacing-12;  
    width: $max-width-full; */;
  }
  .wrapper {
    display: flex;
    flex-direction: row;
    margin-left: auto;
    @apply font-semibold text-sm
    /* font-weight: $font-weight-bold;
    font-size: $font-size-2; */;
  }
  .buttons {
    @apply ml-3
    /* margin-left: $spacing-4; */;
  }

  button {
    background: transparent;
    border-style: none;
    transition: all 0.2s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    button {
      transition: all 2s ease-in-out;
    }
  }

  button:focus,
  button:hover {
    transform: scale(1.1);
  }
</style>
