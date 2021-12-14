import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalmartController } from '../web/rest/walmart.controller';
import { WalmartRepository } from '../repository/walmart.repository';
import { WalmartService } from '../service/walmart.service';
import { FileModule } from './file.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([WalmartRepository]),
    FileModule,
    HttpModule,
    // HttpModule.register({
    //   headers: {
    //     'X-APOLLO-OPERATION-ID': '992fb62dbb65f749f4ead29eb2962cdf05a5c10dcba817a524e4e3e922449b20',
    //     'X-APOLLO-OPERATION-NAME': 'GetProduct',
    //     'WM_CONSUMER.ID': 'c52ce16a-df55-43ee-ba7c-4c24fdb3bb05',
    //     'X-APOLLO-CACHE-KEY': 'be70fd0f8c7608bb64a809fd389e667f',
    //     'X-APOLLO-CACHE-FETCH-STRATEGY': 'NETWORK_ONLY',
    //     'X-APOLLO-EXPIRE-TIMEOUT': '0',
    //     'X-APOLLO-EXPIRE-AFTER-READ': 'false',
    //     'X-APOLLO-PREFETCH': 'false',
    //     'X-APOLLO-CACHE-DO-NOT-STORE': 'false',
    //     'X-PX-AUTHORIZATION': '3',
    //     'X-PX-ORIGINAL-TOKEN': '3:6504b519945cfa980ac2cf49d14430e98c624c41ac9bda47e36c2946cb642a91:5/DWQxc4YozmWrPnhTM7ttFsnK2hv8wTGtajpVVCWfFaz+rkHh8Rdscrapk3FWz8ewYdSZOqU+PXXzydK5Dqpg==:1000:DlvoClCSrIl+tlxGoOabAMOS44TwhqX/8ANg7v5TOiMg9Yrwg8cT5sIc7n9RePeB1RZX3lHHlRARxBA+M3JZs0/0InLefEI4/MOLG8lUuov3BEbOrd/gA/V1AuwWz2ar4YXttSLrDjEbtygANkgB6JT8lvV8K00O4lIs6dh+rTiE7NtAX6TBLaUDSjqK9PvdBFvq+IEHler2O+88NSZfhA==',
    //     'x-o-market': 'US',
    //     'x-o-segment': 'oaoh',
    //     'x-o-platform': 'android',
    //     'x-o-platform-version': '21.27',
    //     'x-wm-sid': '184235ae-b7d1-4b5e-bde4-3e615d1e5084',
    //     'x-wm-vid': '5e138803-a6f5-4a59-8059-b2decd53dd75',
    //     'WM_MP': 'true',
    //     'x-o-fuzzy-install-date': '1639200000000',
    //     'x-enable-server-timing': '1',
    //     'x-latency-trace': '1',
    //     'device_profile_ref_id': '2d563d5ec15908d536cb5708eb26e884',
    //     'Content-Type': 'application/json; charset=utf-8',
    //     'Host': 'www.walmart.com',
    //     'Connection': 'Keep-Alive',
    //     'Accept-Encoding': 'gzip',
    //     'Cookie': 'ACID=32080f12-aaaa-484d-88ea-2706a087e189; _pxhd=Wa3BhDPPfHQvMwMMH71HGpmmNHP35Xa/MM0rTuThUBDoTQUHgtb0VvgluzuI6NQgzM9ZFpLfCrBjfXLSYnGHaA==:r0t/L0KgFf/j1OCofd9anC6iw6Fn-OK6aH9JPFI9ZN/9QtkKv9xHqwQg3oypDBkpVg9H6uIZiJg3gwDNIpt4-UtrHjIlYsX8WOTp7wCqliI=; hasACID=true; TB_DC_Flap_Test=0; TB_Navigation_Preload_01=1; TB_Latency_Tracker_100=1; ak_bmsc=DD577270F3304F7688C6719B3BD8A765~000000000000000000000000000000~YAAQ2RBFdsTeUrJ9AQAAJf2xsg4DuBsL6mvuQpgoZhLga7D3rGvoby6K6EcxfwtRaX42E2sGOphGtbomrjBWWKWwVms4PZQpne8GzQdLXy7+VBtcHe6Ell+kIz1Ww+w/cNaGy429oSJqcr1ebuPHRNh72YW8zEej4icJd6B9gE4bqUtv88tYSfx9c3PLhDVWDpRJxvIti65HT7kMddJeTxHZBqdJ+czGLQdrLNQlDIEV3rhPXDN0IcjDBpFy60JmgocQMQFMDb8ajIEogOgU3POU05dFu9FeSvXf+Eh79hwnHKsxYole9eudsjw40kUCeDdwjJaZE6qPd4ZUgRWFYVnDA2YWCJT167RIyEtWaBo+ph3LmS/mB8WxojajCA==; auth=MTAyOTYyMDE488Sn0Q%2FgTHQPLWYy4E4EB1f%2Bvg4O65OM1Ec0y9JHVNg5YwbG%2BrpWiRso2gcboPXNjQRFeUGCmxvQhoohhoxnPi34Os%2BvLgwiv5J5QT1z5ctc2oCqyXD%2BRlub3NXn8otU767wuZloTfhm7Wk2Kcjygiq0nmGVz3wI1IrcfVbuZ17Za%2BLi5wUU81YEjX8wMob8qtQc1b30gVIjc1bZ3OYNLuq5FxQsEHIWmynv3A%2BdPU0UMk70P8glgOEpLOprhDfMywI05adPtwc9%2Fm5r1ONHR82CgwXb7WUX5ZHFt3uAi%2FsCjUnLuTocFSGY8rBaG%2BDcqHcVVaWE%2B%2Ffn3NCyLo9D5fT9gW8xbrYSempHJ4sCLDoZwGmeox1DJzAge0TpUfxE7qf8X8bDAJo7Qssn6uM2Y0jyrOXbKKhH072NS%2FW0j%2FU%3D; xpm=-2%2B1639381786%2B%2B; xpa=CpYc4|Vwt1Y; akavpau_p1=1639382386~id=be00261dcb013eaeb011fd256d39826e; xpdtc=1; locDataV3=eyJpbnRlbnQiOiJTSElQUElORyIsInBpY2t1cCI6W3siYnVJZCI6IjAiLCJub2RlSWQiOiIzMTgwIiwiZGlzcGxheU5hbWUiOiJTb3V0aCBHYXRlIFN1cGVyY2VudGVyIiwibm9kZVR5cGUiOiJTVE9SRSIsImFkZHJlc3MiOnsicG9zdGFsQ29kZSI6IjkwMjgwIiwiYWRkcmVzc0xpbmUxIjoiNDY1MSBGaXJlc3RvbmUgQmx2ZCIsImNpdHkiOiJTb3V0aCBHYXRlIiwic3RhdGUiOiJDQSIsImNvdW50cnkiOiJVUyIsInBvc3RhbENvZGU5IjoiOTAyODAtMDAwMCJ9LCJnZW9Qb2ludCI6eyJsYXRpdHVkZSI6MzMuOTU0ODM4LCJsb25naXR1ZGUiOi0xMTguMTg3NTUzfSwiaXNHbGFzc0VuYWJsZWQiOnRydWUsInNjaGVkdWxlZEVuYWJsZWQiOnRydWUsInVuU2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZX1dLCJkZWxpdmVyeSI6eyJidUlkIjoiMCIsIm5vZGVJZCI6IjMxODAiLCJkaXNwbGF5TmFtZSI6IlNvdXRoIEdhdGUgU3VwZXJjZW50ZXIiLCJub2RlVHlwZSI6IlNUT1JFIiwiYWRkcmVzcyI6eyJwb3N0YWxDb2RlIjoiOTAyODAiLCJhZGRyZXNzTGluZTEiOiI0NjUxIEZpcmVzdG9uZSBCbHZkIiwiY2l0eSI6IlNvdXRoIEdhdGUiLCJzdGF0ZSI6IkNBIiwiY291bnRyeSI6IlVTIiwicG9zdGFsQ29kZTkiOiI5MDI4MC0wMDAwIn0sImdlb1BvaW50Ijp7ImxhdGl0dWRlIjozMy45NTQ4MzgsImxvbmdpdHVkZSI6LTExOC4xODc1NTN9LCJpc0dsYXNzRW5hYmxlZCI6dHJ1ZSwic2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZSwidW5TY2hlZHVsZWRFbmFibGVkIjp0cnVlLCJhY2Nlc3NQb2ludHMiOlt7ImFjY2Vzc1R5cGUiOiJERUxJVkVSWV9BRERSRVNTIn1dfSwic2hpcHBpbmdBZGRyZXNzIjp7ImxhdGl0dWRlIjozMy45NzI4LCJsb25naXR1ZGUiOi0xMTguMjQ4MiwicG9zdGFsQ29kZSI6IjkwMDAxIiwiY2l0eSI6IkxvcyBBbmdlbGVzIiwic3RhdGUiOiJDQSIsImNvdW50cnlDb2RlIjoiVVNBIiwiZ2lmdEFkZHJlc3MiOmZhbHNlfSwiYXNzb3J0bWVudCI6eyJub2RlSWQiOiIzMTgwIiwiZGlzcGxheU5hbWUiOiJTb3V0aCBHYXRlIFN1cGVyY2VudGVyIiwiYWNjZXNzUG9pbnRzIjpudWxsLCJpbnRlbnQiOiJQSUNLVVAiLCJzY2hlZHVsZUVuYWJsZWQiOmZhbHNlfSwiaW5zdG9yZSI6ZmFsc2UsInJlZnJlc2hBdCI6MTYzOTQwNDg2MTUzNCwidmFsaWRhdGVLZXkiOiJwcm9kOnYyOjMyMDgwZjEyLWFhYWEtNDg0ZC04OGVhLTI3MDZhMDg3ZTE4OSJ9; assortmentStoreId=3180; locGuestData=eyJpbnRlbnQiOiJTSElQUElORyIsInN0b3JlSW50ZW50IjoiUElDS1VQIiwibWVyZ2VGbGFnIjpmYWxzZSwicGlja3VwIjp7Im5vZGVJZCI6IjMxODAiLCJ0aW1lc3RhbXAiOjE2MzkyMjczODcwNDB9LCJwb3N0YWxDb2RlIjp7InRpbWVzdGFtcCI6MTYzOTIyNzM4NzA0MCwiYmFzZSI6IjkwMDAxIn0sInZhbGlkYXRlS2V5IjoicHJvZDp2MjozMjA4MGYxMi1hYWFhLTQ4NGQtODhlYS0yNzA2YTA4N2UxODkifQ%3D%3D; TB_SFOU-100=; hasLocData=1; vtc=a4MiaqoaFlg3lLtw34Ocn8; bstc=ZB1V4yUsfBPV9ZAVTDlAN0; mobileweb=1; xptwg=73988351:186061A4E9D16B0:3FDCF95:FABCAAB6:793964C:22913BFE:; TBWL-94-sbGQLSRL=cge0v5ahjhsw:0:1klvz12y5737d:2qrkct841jjfp; TS01b0be75=01503b2d70de56ed61ec1a885617908f930e548d64f29d825aa9c3e565265f1bfc74721b5db58585fc2c4a18473ce5d325c36fcde4; TS013ed49a=01503b2d70de56ed61ec1a885617908f930e548d64f29d825aa9c3e565265f1bfc74721b5db58585fc2c4a18473ce5d325c36fcde4; akavpau_p2=1639383862~id=4c016bef2fda555cae8a2af35b68d25a; bm_sv=7A5AD81E463966C8935E191D42EB4E7A~bOsJ5c4cbY/lUOMgi/6J9jZRuGR2yt6w3OQkNjzKDFi5md1vdMAdhslyp7oBeAvZq7P2a9SFgOjh2WGUZka7DvI5KUvvM0GOo9CXnntixVqYQdaIcyJvPpnLXjKeCt9TvDsSBHcJvc36DGvCs8mYknqowj2cn2gmZvrwvKghj4E=; TB_SFOU-100=; TS013ed49a=01538efd7c03c2e457fb02fccf7bbd3f96ccd220bb2e79d149393371544c0710bc398dfae07c4ec8386de85f29e325aee3f7545d0f; assortmentStoreId=3180; bstc=ZB1V4yUsfBPV9ZAVTDlAN0; hasLocData=1; locDataV3=eyJpbnRlbnQiOiJTSElQUElORyIsInBpY2t1cCI6W3siYnVJZCI6IjAiLCJub2RlSWQiOiIzMTgwIiwiZGlzcGxheU5hbWUiOiJTb3V0aCBHYXRlIFN1cGVyY2VudGVyIiwibm9kZVR5cGUiOiJTVE9SRSIsImFkZHJlc3MiOnsicG9zdGFsQ29kZSI6IjkwMjgwIiwiYWRkcmVzc0xpbmUxIjoiNDY1MSBGaXJlc3RvbmUgQmx2ZCIsImNpdHkiOiJTb3V0aCBHYXRlIiwic3RhdGUiOiJDQSIsImNvdW50cnkiOiJVUyIsInBvc3RhbENvZGU5IjoiOTAyODAtMDAwMCJ9LCJnZW9Qb2ludCI6eyJsYXRpdHVkZSI6MzMuOTU0ODM4LCJsb25naXR1ZGUiOi0xMTguMTg3NTUzfSwiaXNHbGFzc0VuYWJsZWQiOnRydWUsInNjaGVkdWxlZEVuYWJsZWQiOnRydWUsInVuU2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZX1dLCJkZWxpdmVyeSI6eyJidUlkIjoiMCIsIm5vZGVJZCI6IjMxODAiLCJkaXNwbGF5TmFtZSI6IlNvdXRoIEdhdGUgU3VwZXJjZW50ZXIiLCJub2RlVHlwZSI6IlNUT1JFIiwiYWRkcmVzcyI6eyJwb3N0YWxDb2RlIjoiOTAyODAiLCJhZGRyZXNzTGluZTEiOiI0NjUxIEZpcmVzdG9uZSBCbHZkIiwiY2l0eSI6IlNvdXRoIEdhdGUiLCJzdGF0ZSI6IkNBIiwiY291bnRyeSI6IlVTIiwicG9zdGFsQ29kZTkiOiI5MDI4MC0wMDAwIn0sImdlb1BvaW50Ijp7ImxhdGl0dWRlIjozMy45NTQ4MzgsImxvbmdpdHVkZSI6LTExOC4xODc1NTN9LCJpc0dsYXNzRW5hYmxlZCI6dHJ1ZSwic2NoZWR1bGVkRW5hYmxlZCI6dHJ1ZSwidW5TY2hlZHVsZWRFbmFibGVkIjp0cnVlLCJhY2Nlc3NQb2ludHMiOlt7ImFjY2Vzc1R5cGUiOiJERUxJVkVSWV9BRERSRVNTIn1dfSwic2hpcHBpbmdBZGRyZXNzIjp7ImxhdGl0dWRlIjozMy45NzI4LCJsb25naXR1ZGUiOi0xMTguMjQ4MiwicG9zdGFsQ29kZSI6IjkwMDAxIiwiY2l0eSI6IkxvcyBBbmdlbGVzIiwic3RhdGUiOiJDQSIsImNvdW50cnlDb2RlIjoiVVNBIiwiZ2lmdEFkZHJlc3MiOmZhbHNlfSwiYXNzb3J0bWVudCI6eyJub2RlSWQiOiIzMTgwIiwiZGlzcGxheU5hbWUiOiJTb3V0aCBHYXRlIFN1cGVyY2VudGVyIiwiYWNjZXNzUG9pbnRzIjpudWxsLCJpbnRlbnQiOiJQSUNLVVAiLCJzY2hlZHVsZUVuYWJsZWQiOmZhbHNlfSwiaW5zdG9yZSI6ZmFsc2UsInJlZnJlc2hBdCI6MTYzOTUyMjE3MjYzMiwidmFsaWRhdGVLZXkiOiJwcm9kOnYyOjMyMDgwZjEyLWFhYWEtNDg0ZC04OGVhLTI3MDZhMDg3ZTE4OSJ9; locGuestData=eyJpbnRlbnQiOiJTSElQUElORyIsInN0b3JlSW50ZW50IjoiUElDS1VQIiwibWVyZ2VGbGFnIjpmYWxzZSwicGlja3VwIjp7Im5vZGVJZCI6IjMxODAiLCJ0aW1lc3RhbXAiOjE2MzkyMjczODcwNDB9LCJwb3N0YWxDb2RlIjp7InRpbWVzdGFtcCI6MTYzOTIyNzM4NzA0MCwiYmFzZSI6IjkwMDAxIn0sInZhbGlkYXRlS2V5IjoicHJvZDp2MjozMjA4MGYxMi1hYWFhLTQ4NGQtODhlYS0yNzA2YTA4N2UxODkifQ%3D%3D; mobileweb=0; vtc=a4MiaqoaFlg3lLtw34Ocn8; xprkg=1; xptwg=1295179437:B5C77942122788:1DC3407:E41CFF53:EE71096D:FF0BBA33:; TS01b0be75=01538efd7c565f3161ce7fac2322ab77595e41405e03ccc4fcf1f0f96cf4e73af0fd12d455c84fa2cbd5e76f4c9bed1ee0aa0c0f81; _pxhd=v3y2vmq/SBA9DkinXvcpL2aRF8CqiogdrPub8IwmumIViIXG/iIfGl0ghRs5TEldJO7bEvaAo54-8HNqqul95Q==:vHpFAQKr1MW4one2nZRPeYzQUntOB53zvXmQ7gL4JT3TxAZDk3jZOcrH0cua1DDHrdDqZEDjxrZT1PS/YHNGJN053p1jXJBWVbWXcDuFnPI=; akavpau_p2=1639501639~id=9ab6ca70905a69d3efe264bc85b48783',
    //     'User-Agent': 'WMT1H/21.27 Android/7.1.2',
    //   },
    // }),
  ],
  controllers: [WalmartController],
  providers: [WalmartService],
  exports: [WalmartService],
})
export class WalmartModule { }
