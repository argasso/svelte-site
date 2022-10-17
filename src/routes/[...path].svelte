<script context="module">
  /** @type {import('./__types/[...path]').Load} */
  export function load({ params }) {
    return {
      status: 404,
      error: new Error(`Not found: ${params.path}`),
    }
  }
</script>
