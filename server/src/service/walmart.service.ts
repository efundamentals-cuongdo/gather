import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WalmartDTO } from '../service/dto/walmart.dto';
import { WalmartMapper } from '../service/mapper/walmart.mapper';
import { WalmartRepository } from '../repository/walmart.repository';
import { Walmart } from '../domain/walmart.entity';
import { v4 as uuid } from 'uuid';
import { FileService } from './file.service';
import { HttpService } from '@nestjs/axios';
import axios from "axios";
import queryString from "querystring";

const relationshipNames = [];
const RETAILER = 'Walmart';

@Injectable()
export class WalmartService {

  logger = new Logger('WalmartService');

  constructor(
    @InjectRepository(WalmartRepository) private walmartRepository: WalmartRepository,
    private fileService: FileService,
    private httpService: HttpService,
  ) { }

  async one(url: string): Promise<WalmartDTO> {
    //gather product
    const body = {
      "operationName": "SearchService",
      "variables": {
          "isGuidedNav": false,
          "pageNumber": 1,
          "ps": 20,
          "query": "dog food",
          "facet": "",
          "spelling": true,
          "pageType": "MobileSearchPage",
          "fitmentSearchParams": {
              "guided_nav": false,
              "query": "dog food",
              "facet": "",
              "ps": 20,
              "page": 1,
              "spelling": true,
              "prg": "android",
              "preciseSearch": true,
              "grid": true,
              "pageType": "MobileSearchPage"
          },
          "version": "v0"
      },
      "query": "query SearchService($sType: String, $srcQuery: String, $position: Int, $isGuidedNav: Boolean, $recallSet: String, $affinityOverride: AffinityOverride, $pageNumber: Int!, $ps: Int, $pap: String, $sortMethod: Sort, $query: String, $categoryId: String, $shelfId: String, $facet: String, $minPrice: String, $maxPrice: String, $ptss: String, $xpa: String, $displayGuidedNav: Boolean, $spelling: Boolean, $pageType: String!, $fitmentSearchParams : JSON, $fitmentFieldParams : JSON, $dealsId: String, $additionalQueryParams: JSON, $version: String) { search(prg: android, preciseSearch: true, spelling: $spelling, s_type: $sType, src_query: $srcQuery, pos: $position, guided_nav: $isGuidedNav, affinityOverride: $affinityOverride, page: $pageNumber, ps: $ps, pap: $pap, query: $query, cat_id: $categoryId, _be_shelf_id: $shelfId, sort: $sortMethod, facet: $facet, min_price: $minPrice, max_price: $maxPrice, recall_set: $recallSet, ptss: $ptss, xpa: $xpa, displayGuidedNav: $displayGuidedNav, dealsId: $dealsId, additionalQueryParams: $additionalQueryParams, pageType: $pageType) { __typename query searchResult { __typename ...SearchResultFragment } } contentLayout(channel: \"Mobile\", pageType: $pageType, tenant: \"WM_GLASS\", searchArgs: {query: $query, cat_id: $categoryId, facet: $facet, _be_shelf_id: $shelfId, prg: android}, version: $version) { __typename modules(tempo: {pageId: $dealsId}) { __typename name version type moduleId schedule { __typename priority } matchedTrigger { __typename pageId zone inheritable } configs { __typename ... on TempoWM_GLASSMobileDealsConfigConfigs { deals(searchParams: $fitmentSearchParams) { __typename ...SearchResultFragment } } ... on TempoWM_GLASSMobileSearchNonItemConfigs { _rawConfigs searchNonItemConfigsModuleSource: moduleSource title subTitle urlLinkText url } ... on TempoWM_GLASSMobilePillsModuleConfigs { moduleSource pillsV2 { __typename ...PillsFragment } } ... on _TempoWM_GLASSMobileSearchGuidedNavModuleConfigs { guidedNavigation { __typename ...GuidedNavigationFragment } } ... on _TempoWM_GLASSMobileSearchSortFilterModuleConfigs { facetsV1 { __typename ...FacetFragment values { __typename ...FacetFragment } } } ... on TempoWM_GLASSMobileSearchBannerConfigs { moduleType viewConfig { __typename ...SearchBannerFragment } } ... on TempoWM_GLASSMobileInlineSearchConfigs { placeholderText } ... on _TempoWM_GLASSMobileGiftFinderFiltersConfigs { facets { __typename ...FacetFragment values { __typename ...FacetFragment } } } ...locationHeadingBanner ...headingBanner ...sponsoredBrandAmplifierAd ...FitmentFragment ...skylineDisplayAd ...HorizontalChipModuleConfigsFragment ...skinnyBannerFragment ...GiftFinderBannerFragment ...EventTimerConfigsFragment ...enricher ...walmartPlusDuringEventBannerV1 ...walmartPlusPreEventBannerV1 ... on TempoWM_GLASSMobileStoreSelectionHeaderConfigs { fulfillmentMethodLabel storeDislayName } } } pageMetadata { __typename location { __typename stateOrProvinceCode postalCode storeId incatchment } pageContext } layouts { __typename id layout } } } fragment SearchResultFragment on SearchInterface { __typename itemStacks { __typename meta { __typename ...MetadataFragment } items { __typename ...ItemFragment } } pageMetadata { __typename title noIndex location { __typename addressId } storeSelectionHeader { __typename fulfillmentMethodLabel storeDislayName } } spelling { __typename correctedTerm } paginationV2 { __typename maxPage pageProperties currentPage pap { __typename polaris { __typename rerankOffset } } } errorResponse { __typename correlationId source errors { __typename errorType statusCode statusMsg source } } requestContext { __typename searchMatchType shelfDisplayName } modules { __typename giftFacets { __typename ...FacetFragment values { __typename ...FacetFragment } } facetsV1 { __typename ...FacetFragment values { __typename ...FacetFragment values { __typename ...FacetFragment } } } guidedNavigation { __typename ...GuidedNavigationFragment } guidedNavigationV2 { __typename ...PillsFragment } pills { __typename ...PillsFragment } spellCheck { __typename title subTitle urlLinkText url } } } fragment MetadataFragment on Meta { __typename query stackId stackType title categoryTitle totalItemCount layoutEnum adsBeacon { __typename adUuid moduleInfo max_ads } viewAllParams { __typename query cat_id sort facet affinityOverride displayGuidedNav recall_set min_price max_price } fulfillmentIntent } fragment ItemFragment on Product { __typename id usItemId name brand type showAtc showOptions checkStoreAvailabilityATC seeShippingEligibility blitzItem annualEvent externalInfo { __typename url } imageInfo { __typename ...ProductImageInfoFragment } averageRating numberOfReviews salesUnitType esrb mediaRunningTime mediaRating availabilityStatusV2 { __typename value display } mediaLanguage orderLimit orderMinLimit weightIncrement badge { __typename type dynamicDisplayName beaconId } unifiedBadge: badges { __typename flags { __typename ... on BaseBadge { id text key } ... on PreviouslyPurchasedBadge { id text key lastBoughtOn numBought } } tags { __typename ... on BaseBadge { id text key } } } fulfillmentBadge fulfillmentSpeed sellerId sellerName sponsoredProduct { __typename clickBeacon spQs spTags } offerId priceInfo { __typename ...ProductPriceInfoFragment } currencyCode fulfillmentType variantCriteria { __typename ...VariantCriteriaFragment } preOrder { __typename ...PreOrderFragment } fitmentLabel productLocation { __typename displayValue aisle { __typename zone aisle section } } canonicalUrl similarItems } fragment ProductImageInfoFragment on ProductImageInfo { __typename thumbnailUrl } fragment ProductPriceInfoFragment on ProductPriceInfo { __typename priceRange { __typename minPrice maxPrice priceString unitOfMeasure } priceDisplayCodes { __typename unitOfMeasure priceDisplayCondition pricePerUnitUom unitPriceDisplayCondition finalCostByWeight } currentPrice { __typename ...ProductPriceFragment } wasPrice { __typename ...ProductPriceFragment } unitPrice { __typename ...ProductPriceFragment } listPrice { __typename ...ProductPriceFragment } subscriptionPrice { __typename priceString subscriptionString } shipPrice { __typename ...ProductPriceFragment } } fragment ProductPriceFragment on ProductPrice { __typename price priceString } fragment VariantCriteriaFragment on VariantCriterion { __typename name type id variantList { __typename id images name rank swatchImageUrl availabilityStatus products } } fragment PreOrderFragment on PreOrder { __typename isPreOrder preOrderMessage preOrderStreetDateMessage } fragment FacetFragment on Facet { __typename id name layout paramType type url itemCount expandOnLoad isSelected min max selectedMin selectedMax unboundedMax displayMultiLevelCategory catPathName description } fragment GuidedNavigationFragment on GuidedNavigationSearchInterface { __typename title query url suggestionType } fragment PillsFragment on PillsSearchInterface { __typename title catID url suggestionType catPathName image: imageV1 { __typename src } } fragment locationHeadingBanner on TempoWM_GLASSMobileLocationHeadingBannerConfigs { __typename defaultStoreTitle defaultLocationTitle } fragment headingBanner on _TempoWM_GLASSMobileHeadingBannerConfigs { __typename welcomeText heading shouldDisplaySubheading subHeading isStoreModeModule } fragment sponsoredBrandAmplifierAd on TempoWM_GLASSMobileBrandAmplifierAdConfigs { __typename moduleLocation ad { __typename adContent { __typename data { __typename ... on SponsoredBrands { adUuid adExpInfo moduleInfo debug brands { __typename logo { __typename featuredImage featuredImageName featuredUrl featuredHeadline logoClickTrackUrl } products { __typename ...product } } } } } } } fragment FitmentFragment on TempoWM_GLASSMobileSearchFitmentModuleConfigs { __typename fitments(fitmentSearchParams: $fitmentSearchParams, fitmentFieldParams: $fitmentFieldParams) { __typename partTypeIDs result { __typename status formId notes position quantityTitle extendedAttributes { __typename ...fitmentfields } suggestions { __typename id position loadIndex speedRating searchQueryParam labels { __typename ...fitmentlabels } } labels { __typename ...fitmentlabels } resultSubTitle } labels { __typename ...fitmentlabels } savedVehicle { __typename vehicleYear { __typename ...fitmentvehiclefields } vehicleMake { __typename ...fitmentvehiclefields } vehicleModel { __typename ...fitmentvehiclefields } additionalAttributes { __typename ...fitmentvehiclefields } } sisFitmentResponse { __typename ...SearchResultFragment } } } fragment skylineDisplayAd on TempoWM_GLASSMobileSkylineDisplayAdConfigs { __typename ad { __typename adContent { __typename data { __typename ... on DisplayAd { json status } } type } adsContext moduleType moduleConfigs platform pageId pageType pageContext status storeId stateCode zipCode } enableLazyLoad rawConfig: _rawConfigs } fragment HorizontalChipModuleConfigsFragment on TempoWM_GLASSWWWHorizontalChipModuleConfigs { __typename chipModuleSource: moduleSource chipModule { __typename title url { __typename linkText title clickThrough { __typename type value rawValue tag } } } chipModuleWithImages { __typename title url { __typename linkText title clickThrough { __typename type value rawValue tag } } image { __typename alt assetId assetName clickThrough { __typename type value rawValue tag } height src title width } } } fragment skinnyBannerFragment on TempoWM_GLASSMobileSkinnyBannerConfigs { __typename campaigns { __typename bannerBackgroundColor destination { __typename title clickThrough { __typename type value } } heading { __typename text textColor } subHeading { __typename text textColor } image { __typename src alt } } } fragment GiftFinderBannerFragment on TempoWM_GLASSMobileGiftFinderBannerConfigs { __typename occasion { __typename occasionKey bannerBackgroundColor bannerImage { __typename src alt } heading { __typename text textColor } } } fragment EventTimerConfigsFragment on TempoWM_GLASSMobileEventTimerConfigs { __typename backgroundColor borderColor defaultTextColor endTime eventName linkAfterExpiry { __typename clickThrough { __typename type value } title } linkBeforeExpiry { __typename clickThrough { __typename type value } title } postExpirationSubText preExpirationSubTextLong preExpirationSubTextShort startTime sunsetTime titleTextColor } fragment enricher on EnricherModuleConfigsV1 { __typename zoneV1 } fragment walmartPlusDuringEventBannerV1 on TempoWM_GLASSMobileWalmartPlusEarlyAccessDuringEventConfigsV1 { __typename dealsBackground dealsLayout earlyAccessLogo { __typename alt src } earlyAccessTitle earlyAccessCardMesssage earlyAccessCounterLabel earlyAccessstartTime earlyAccessendTime earlyAccesssunsetTime earlyAccessSubText earlyAccessLink1 { __typename title clickThrough { __typename type value } } earlyAccessLink2 { __typename clickThrough { __typename type value } title } } fragment walmartPlusPreEventBannerV1 on TempoWM_GLASSMobileWalmartPlusEarlyAccessBeforeEventConfigsV1 { __typename dealsBackground dealsDisclaimer dealsLayoutType : dealsLayout dealsSubtext1 dealsSubtext2 earlyAccessLogo { __typename alt src } earlyAccessTitle earlyAccessCardMesssage earlyAccessLink1 { __typename title clickThrough { __typename type value } } earlyAccessLink2 { __typename title clickThrough { __typename type value } } } fragment product on Product { __typename availabilityStatus averageRating badges { __typename ...badgesFragment } canonicalUrl classType departmentName fulfillmentBadge id imageInfo { __typename thumbnailUrl } mediaRating name numberOfReviews offerId orderLimit orderMinLimit p13nData { __typename flags { __typename ...productFlagsLabels } labels { __typename ...productFlagsLabels } predictedQuantity seeSimilarLinkEnabled } preOrder { __typename isPreOrder preOrderMessage preOrderStreetDateMessage } priceInfo { __typename priceDisplayCodes { __typename clearance finalCostByWeight priceDisplayCondition rollback } currentPrice { __typename price priceString } wasPrice { __typename price priceString } unitPrice { __typename price priceString } priceRange { __typename minPrice maxPrice priceString unitOfMeasure } shipPrice { __typename price priceString } } salesUnit sponsoredProduct { __typename clickBeacon spQs spTags } showAtc showOptions type usItemId variantCount variantCriteria { __typename name variantList { __typename swatchImageUrl } } weightIncrement } fragment badgesFragment on UnifiedBadge { __typename flags { __typename ...badgeInterfaceFragment } tags { __typename ...badgeInterfaceFragment } labels { __typename ...badgeInterfaceFragment } } fragment badgeInterfaceFragment on BadgeInterface { __typename ... on BaseBadge { id key rank text type query } ... on PreviouslyPurchasedBadge { id key rank text lastBoughtOn numBought criteria { __typename name value } } } fragment productFlagsLabels on P13NDataFlagsLabels { __typename PREVIOUSLY_PURCHASED { __typename text } CUSTOMERS_PICK { __typename text } } fragment fitmentlabels on FitmentLabels { __typename links { __typename id label } messages { __typename id label } ctas { __typename id label } images { __typename id label } } fragment fitmentfields on FitmentField { __typename id value displayName data { __typename label value } extended dependsOn } fragment fitmentvehiclefields on FitmentVehicleField { __typename id value label } fragment SearchBannerFragment on BannerViewConfigCLS { __typename title image displayName description url playStoreLink }"
  }

    const apiCall = axios.create({
        baseURL: "https://www.walmart.com/orchestra/snb/graphql/search?spelling=true&isGuidedNav=false&query=dog%20food&ps=20&pageNumber=1",
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WMT1H/21.27 Android/7.1.2',
          'X-APOLLO-OPERATION-NAME': 'GetProduct'
        },
        data: body
    });

    apiCall.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (!error.response) {
                console.log("%cSystem: " + error.message + "!", "color:red; font-size:30px;");
                return;
            }
            // handle Errors
            switch (error.response.status) {
                case 400:
                    return error.response.data.errors;
                default:
                    break;
            }
    
            return error.response;
        }
    );

    console.log("axios 2nd:")
    await apiCall.post("").then(res => console.log(res.data))
    // console.log("nest axios:")
    // await this.httpService.post(url).toPromise().then(res => console.log(res))
    // this.logger.log('Product res: ', res);
    //save product to file
    // const product = new Walmart();
    // product.productNo = '01';
    // product.name = 'product 01';
    // await this.store(Buffer.from(JSON.stringify(res.data), 'utf-8'), 'json');
    return WalmartMapper.fromEntityToDTO(new Walmart());
  }

  async searching(q: string): Promise<WalmartDTO[]> {
    return null;
  }

  async category(url: string): Promise<WalmartDTO[]> {
    return null;
  }

  async store(content: Buffer, extension: string): Promise<string> {
    const id = uuid();
    const url = await this.fileService.store(RETAILER, id, extension, content);
    return id;
  }


}
