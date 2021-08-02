<template>
  <Page actionBarHidden="true">
    <ScrollView v-if="!showWebView">
      <ListView for="tool in researchTools" @itemTap="onResearchToolTap">
        <v-template>
          <Image :src="tool.imageSrc" width="80%" class="m-y-5 bg-white" />
        </v-template>
      </ListView>
    </ScrollView>

    <GridLayout v-else rows="* 50">
      <WebView :src="webViewSrc" row="0" />
      <Button row="1" text="< Back to Research Tools" @tap="goBack" />
    </GridLayout>
  </Page>
</template>

<script>
  import view from '@nativescript/core/ui/core/view'

  export default {
    name: 'ResearchTools',
    displayName: 'Research Tools',
    icon: 'fa-wrench',
    data () {
      return {
        showWebView: false,
        webViewSrc: '',
        researchTools: [
          {
            name: 'ResearchTool_Galileo',
            imageSrc: '~/assets/images/galileo-logo.png',
            url: 'https://www.galileo.usg.edu/express?link=nhda'
          },
          {
            name: 'ResearchTool_DigitalLibrarayGeorgia',
            imageSrc: '~/assets/images/digi-lib-ga-logo.png',
            url: 'https://dlg.usg.edu'
          },
          {
            name: 'ResearchTool_NewGaEncyclopedia',
            imageSrc: '~/assets/images/new-ga-encyclopedia-logo.png',
            url: 'https://www.georgiaencyclopedia.org'
          },
          {
            name: 'ResearchTool_GaArchives',
            imageSrc: '~/assets/images/ga-archives-logo.png',
            url: 'https://www.georgiaarchives.org'
          },
          {
            name: 'ResearchTool_LewisLibraryLibGuides',
            imageSrc: '~/assets/images/lagrange-college-logo.png',
            url: 'https://lagrange.libguides.com/nhd'
          },
          {
            name: 'ResearchTool_ChroniclingAmerica',
            imageSrc: '~/assets/images/chronicling-america-logo.png',
            url: 'https://chroniclingamerica.loc.gov'
          }
        ]
      }
    },

    props: ['currentPage'],

    methods: {
      onResearchToolTap: function (e) {
        this.$emit('update-current-page', e.item.name)
        this.webViewSrc = e.item.url
        this.showWebView = true
      },

      goBack: function (args) {
        this.showWebView = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg-white {
    background-color: white;
  }
</style>
