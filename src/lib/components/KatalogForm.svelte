<form name="katalog" method="POST" data-netlify="true">
  <div class="mt-8 max-w-md">
    <div class="grid grid-cols-1 gap-6">
      <label class="block">
        <span class="text-gray-700">Beställt antal kataloger</span>
        <input
          type="text"
          name="antal"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="" />
      </label>
      <label class="block">
        <span class="text-gray-700">Namn</span>
        <input
          type="text"
          name="namn"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Ange för- och efternamn" />
      </label>
      <label class="block">
        <span class="text-gray-700">Adress</span>
        <input
          type="text"
          name="adress1"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="" />
      </label>
      <label class="block">
        <span class="text-gray-700">Adress</span>
        <input
          type="text"
          name="adress2"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="" />
      </label>
      <div class="flex">
        <label class="block">
          <span class="text-gray-700">Postnummer</span>
          <input
            type="text"
            name="postnummer"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="" />
        </label>
        <label class="block">
          <span class="text-gray-700">Ort</span>
          <input
            type="text"
            name="postort"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="" />
        </label>
      </div>
      <label class="block">
        <span class="text-gray-700">E-postadress</span>
        <input
          type="epostadress"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="namn@exempel.se" />
      </label>
      <p>
        <button type="submit">Send</button>
      </p>
    </div>
  </div>
</form>
<slot />
