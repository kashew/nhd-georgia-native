<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <TabView tabTextFontSize="14">
        <TabViewItem title="NHD GEORGIA">
          <WebView src="https://www.youtube.com/channel/UCLHPR0Br8EDXICslJ75MK7g" height="100%" />
        </TabViewItem>
        <TabViewItem title="NHD">
          <WebView src="https://www.youtube.com/user/nationalhistory" height="100%" />
        </TabViewItem>
      </TabView>
    </StackLayout>
  </Page>
</template>

<script>
  import * as utilsModule from '@nativescript/core/utils/utils'

  export default {
    name: 'NhdVideos',
    displayName: 'NHD Videos',
    icon: 'fa-film',

    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
</style>
