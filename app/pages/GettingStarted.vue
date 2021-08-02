<template>
  <Page actionBarHidden="true">
    <StackLayout v-if="!showPdf">
      <TabView tabTextFontSize="14">
        <TabViewItem title="Theme">
          <ScrollView>
            <StackLayout class="m-10">
              <Image src="~/assets/images/theme-logo.png" width="70%" class="m-b-20" />

              <Label text="Theme" class="font-weight-bold" />
              <Label textWrap="true" class="m-b-20" text="Start your NHD journey by reviewing the 2020-2021 theme book and rule book.  This year’s theme is “Communication in History”" />

              <Button text="2022 Theme Book" class="nt-button -primary -rounded-lg font-sm m-b-20" @tap="openThemeBook()" />
              <Button text="2022 NHD Rule Book" class="nt-button -primary -rounded-lg font-sm m-b-20" @tap="openRuleBook()" />
              <Button text="2022 NHD Theme Narrative" class="nt-button -primary -rounded-lg font-sm" @tap="openThemeNarrative()" />
            </StackLayout>
          </ScrollView>
        </TabViewItem>
        <TabViewItem title="Topic Exploration">
          <ScrollView height="100%">
            <StackLayout height="100%" class="m-10">
              <Label text="Topic Exploration" class="font-weight-bold" />
              <Label class="m-b-5" textWrap="true" text="Selecting a topic for your NHD project is one of the most critical decisions you’re going to make.  This is a subject that you’re going to be spending a LOT of time with so it has to be something YOU are interested in.  Remember that you want to be able to show how your topic relates to the theme AND its significance to history!  Check out the following sources to help you select and narrow a topic for your NHD project:" />

              <ListView for="source in sources" height="100%">
                <v-template>
                  <Button class="nt-button -primary -rounded-lg font-sm" :text="source.text" @tap="onSourceTap(source)" />
                </v-template>
              </ListView>
            </StackLayout>
          </ScrollView>
        </TabViewItem>
      </TabView>
    </StackLayout>

    <GridLayout v-else rows="* 50">
      <PDFView :src="pdfSource" row="0" />
      <Button row="1" text="< Back to Getting Started" @tap="goBack" />
    </GridLayout>
  </Page>
</template>

<script>
  import * as utilsModule from '@nativescript/core/utils/utils'
  import { knownFolders, path } from '@nativescript/core/file-system'

  export default {
    name: 'GettingStarted',
    displayName: 'Getting Started',
    icon: 'fa-rocket',
    data () {
      return {
        showPdf: false,
        pdfSource: null,
        sources: [
          {
            name: 'GettingStarted_NhdGaThemeTopicExplorer',
            url: 'https://www.georgiahumanities.org/2019/09/25/nhd-topic-explorer',
            asset: null,
            text: 'NHD GA Theme Topic Explorer'
          },
          {
            name: 'GettingStarted_HowToNarrowTopicDrShirley',
            url: 'https://www.lagrange.edu/academics/undergraduate/majors/history/national-history-day/_images/Narrowing-a-Topic.pdf',
            asset: '/assets/pdfs/NarrowingTopic.pdf',
            text: 'How to Narrow a Topic by Dr. Kevin Shirley'
          },
          {
            name: 'GettingStarted_SampleTopicFunnelMnhs',
            url: 'https://www.lagrange.edu/academics/undergraduate/majors/history/national-history-day/_images/Sample-Topic-Funnel.pdf',
            asset: '/assets/pdfs/SampleTopicFunnel.pdf',
            text: 'Sample Topic Funnel from MNHS'
          },
          {
            name: 'GettingStarted_HowToSelectNarrowTopicMnhs',
            url: 'https://www.lagrange.edu/academics/undergraduate/majors/history/national-history-day/_images/Selecting-and-Narrowing-Topic.pdf',
            asset: '/assets/pdfs/SelectingNarrowingTopic.pdf',
            text: 'How to Select and Narrow a Topic by MNHS'
          },
          {
            name: 'GettingStarted_SelectingTopicNhd',
            url: 'https://primarysourcenexus.org/2014/11/nhd-2015-selecting-topic-history-project',
            asset: null,
            text: 'Selecting a Topic for NHD'
          },
          {
            name: 'GettingStarted_DebateDiplomacy',
            url: null,
            asset: '/assets/pdfs/NhdDebateDiplomacy.pdf',
            text: 'Debate & Diplomacy in History'
          }
        ]
      }
    },

    methods: {
      onSourceTap: function (source) {
        this.$emit('update-current-page', source.name)

        if (source.asset) {
          this.pdfSource = path.normalize(knownFolders.currentApp().path + source.asset)
          this.showPdf = true
        } else {
          utilsModule.openUrl(source.url)
        }
      },

      openThemeBook: function () {
        this.$emit('update-current-page', 'GettingStarted_ThemeBook')

        this.pdfSource = path.normalize(knownFolders.currentApp().path + '/assets/pdfs/NhdThemeBook.pdf')
        this.showPdf = true
      },

      openRuleBook: function () {
        this.$emit('update-current-page', 'GettingStarted_RuleBook')

        this.pdfSource = path.normalize(knownFolders.currentApp().path + '/assets/pdfs/NhdRuleBook2014-2015.pdf')
        this.showPdf = true
      },

      openThemeNarrative: function () {
        this.$emit('update-current-page', 'GettingStarted_ThemeNarrative')

        this.pdfSource = path.normalize(knownFolders.currentApp().path + '/assets/pdfs/NhdThemeNarrative.pdf')
        this.showPdf = true
      },

      goBack: function () {
        this.showPdf = false
        this.pdfSource = null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .font-sm {
    font-size: 16px;
  }

  TabViewItem {
    font-size: 10px;
  }
</style>
