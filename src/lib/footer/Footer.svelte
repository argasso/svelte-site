<script lang="ts">
  import Logo from '$lib/logo/Logo.svelte'
</script>

<footer class="text-gray-100">
  <div class="h-2 bg-white" />
  <svg
    class="wave-top"
    viewBox="0 0 1439 147"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns-xlink="http://www.w3.org/1999/xlink">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
        <g class="wave" fill="#ffffff">
          <path
            d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z" />
        </g>
        <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
          <g
            transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
            <path
              d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
              opacity="0.100000001" />
            <path
              d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
              opacity="0.100000001" />
            <path
              d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
              opacity="0.200000003" />
          </g>
        </g>
      </g>
    </g>
  </svg>

  <div class="container">
    <div class="flex flex-wrap md:text-left text-center order-first">
      <div class="lg:w-1/3 md:w-1/2 w-full mb-10">
        <h3>Kontaktuppgifter</h3>
        <nav class="list-none text-red-100">
          <li class="mb-2 ">
            Lasarettsgatan 12
            <br />
            89133 Örnsköldsvik
          </li>
          <li class="mb-2 ">0660 - 27 36 40</li>
          <li class="mb-2 ">info@argasso.se</li>
        </nav>
      </div>
      <div class="lg:w-1/3 md:w-1/2 w-full mb-10">
        <h3>Villkor</h3>
        <nav class="list-none text-red-100">
          <li class="mb-2">
            <a href="/integritetspolicy" class="mb-2 text-red-100">
              Försäljnings och leveransvilkor
            </a>
          </li>
          <li class="mb-2">
            <a href="/integritetspolicy" class="mb-2 text-red-100">Policy för cookies</a>
          </li>
          <li class="mb-2">
            <a href="/integritetspolicy" class="mb-2 text-red-100">Integritetspolicy</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/3 md:w-1/2 w-full mb-10">
        <h3><label for="mce-EMAIL">Nyhetsbrev</label></h3>
        <div
          class="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
          <div class="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
            <form
              id="mc-embedded-subscribe-form"
              class="validate"
              action="https://argasso.us18.list-manage.com/subscribe/post?u=77df9b40f7b88d80d2730b6bb&amp;id=b391a49e94"
              method="post"
              name="mc-embedded-subscribe-form"
              target="_blank">
              <div id="mc_embed_signup_scroll" class="flex flex-col md:flex-row gap-3">
                <div style="position: absolute; left: -5000px;">
                  <input
                    tabindex="-1"
                    name="b_77df9b40f7b88d80d2730b6bb_b391a49e94"
                    type="text"
                    value="" />
                </div>
                <input
                  id="mce-EMAIL"
                  class="md:mr-3 bg-argasso-100 rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  name="EMAIL"
                  type="email"
                  value=""
                  placeholder="E-postadress" />
                <input
                  id="mc-embedded-subscribe"
                  class="bg-argasso-100 hover:bg-argasso-200 active:bg-white text-gray-800 font-bold rounded-full py-3 px-8 shadow-lg focus:shadow-outline"
                  name="subscribe"
                  type="submit"
                  value="Prenumerera" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="w-full text-gray-100 border-t border-red-300 opacity-50">
        <div class="flex items-center">
          <a
            href="/"
            class="flex title-font font-medium items-center md:justify-start justify-center text-red-200">
            <Logo class="w-32 h-16" />
          </a>
          <div class="text-sm sm:ml-6 sm:mt-0 mt-4 text-red-200">
            © 2020 Argasso —
            <a
              href="https://twitter.com/ArgassoBok"
              rel="noopener noreferrer"
              class="ml-1 text-red-200"
              target="_blank">
              @ArgassoBok
            </a>
          </div>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://www.facebook.com/ArgassoBok" class="text-red-200">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-Width="2"
                class="w-5 h-5"
                view-box="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="https://twitter.com/ArgassoBok" class="ml-3 text-red-200">
              <svg
                fill="currentColor"
                stroke-line-cap="round"
                stroke-line-join="round"
                stroke-width="2"
                class="w-5 h-5"
                view-box="0 0 24 24">
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="https://instagram.com/ArgassoBok" class="ml-3 text-red-200">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-line-cap="round"
                stroke-line-join="round"
                stroke-width="2"
                class="w-5 h-5"
                view-box="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCjJNoRtTFannXnJ9SrYGUAA"
              class="ml-3 text-red-200">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-line-cap="round"
                stroke-line-join="round"
                stroke-width="0"
                class="w-5 h-5"
                view-box="0 0 24 24">
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" stroke="none" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</footer>
