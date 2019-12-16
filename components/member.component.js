import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MemberInformationService from '../services/member-info.service';
import BrushingDataService from '../services/brushing-data.service';
import {Svg, Path, Polygon} from 'react-native-svg';

class MemberComponent extends Component {
  static navigationOptions = {
    title: 'Member Information',
  };

  willFocusSubscription;

  state = {
    member: {},
    brushingData: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const member = MemberInformationService.getActiveSelfInsuredMemberData(
        'Remy LeBeau',
      );

      let history = await BrushingDataService.getBrushingHistory(member.id);

      this.willFocusSubscription = this.props.navigation.addListener(
        'willFocus',
        async () => {
          let updateHistory = await BrushingDataService.getBrushingHistory(
            this.state.member.id,
          );
          this.setState({brushingData: updateHistory});
        },
      );

      if (!history) {
        history = this.state.brushingData;
      }

      this.setState({
        member: member,
        brushingData: history,
        loading: false,
      });
    } catch (err) {
      console.log('Error while loading member data: ', err);
    }
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  brushingHistoryDateFormat(dateIn) {
    const date = new Date(dateIn);

    return `${date.getMonth() +
      1}/${date.getDate()}/${date.getFullYear()} at ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, 0)}`;
  }

  brushingDurationFormat(duration: number) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor((duration % 3600) % 60);

    return `${
      hours > 0 ? `${hours}${hours === 1 ? ' hour, ' : ' hours, '}` : ''
    }${
      hours > 0 || minutes > 0
        ? `${minutes}${minutes === 1 ? ' minute, ' : ' minutes, '}`
        : ''
    }${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Svg style={styles.logoImage} viewBox="0 0 147 39">
          <Path
            d="M47.9999975,8.0029616 C47.9984666,9.10753553 47.101754,10.0016317 45.9971421,9.99999776 C44.8925303,9.9984659 43.9983692,9.10171445 44.0000022,7.99714053 C44.0016352,6.8925666 44.8983478,5.99836825 46.0029596,6.00000224 C47.1075715,6.00163622 48.0017325,6.89838767 47.9999975,8.0029616"
            id="Fill-1"
            fill="#00C9F0"
          />
          <Path
            d="M40.9999978,2.00294075 C40.9983862,3.10752619 40.1016507,4.00161049 38.9971085,3.99999782 C37.8925663,3.99848001 36.9983905,3.10173954 37.0000022,1.99715411 C37.0016138,0.892568677 37.8983493,-0.00161049402 39.0029863,2.17794027e-06 C40.1074337,0.0016148499 41.0016095,0.898355324 40.9999978,2.00294075"
            id="Fill-2"
            fill="#00C9F0"
          />
          <Path
            d="M40.9999973,8.50361148 C40.9980028,9.88433596 39.8770573,11.0020879 38.4963434,10.9999971 C37.1156296,10.9980013 35.9979134,9.877113 36.0000029,8.49629348 C36.0019975,7.115569 37.122943,5.99791207 38.5036568,6.00000293 C39.8843707,6.00199874 41.0019919,7.122887 40.9999973,8.50361148"
            id="Fill-3"
            fill="#00C9F0"
          />
          <Path
            d="M59.9667607,39 L58.477503,39 C57.9067717,39 57.4441723,38.5427623 57.4441723,37.9787363 L57.4441723,19.9774281 C57.4441723,19.1158047 57.2351296,18.4626982 56.8179583,18.0183799 C56.4006956,17.5745132 55.8282276,17.352354 55.1014684,17.352354 C54.3737952,17.352354 53.8085482,17.5745132 53.4038993,18.0183799 C53.0000731,18.4626982 52.7982514,19.1158047 52.7982514,19.9774281 L52.7982514,37.9787363 C52.7982514,38.5427623 52.335652,39 51.7650121,39 L50.2353535,39 C49.6646222,39 49.2020228,38.5427623 49.2020228,37.9787363 L49.2020228,19.9774281 C49.2020228,19.1158047 48.9929801,18.4626982 48.5757174,18.0183799 C48.1576321,17.5745132 47.5995146,17.352354 46.8988058,17.352354 C45.3366986,17.352354 44.5551879,18.22771 44.5551879,19.9774281 L44.5551879,37.9787363 C44.5551879,38.5427623 44.0925884,39 43.5218572,39 L42.0332393,39 C41.4625995,39 41,38.5427623 41,37.9787363 L41,15.8296737 C41,14.9976835 41.6823365,14.3232556 42.5240829,14.3232556 L42.5244485,14.3232556 C43.0370463,14.3232556 43.5163729,14.5736929 43.8051205,14.9922628 L43.9503626,15.2029481 C44.0494454,15.3465972 44.2549233,15.347049 44.3686308,15.214422 C45.0618445,14.4050181 46.0400581,14 47.3034546,14 C48.3801112,14 49.2154593,14.2159254 49.8085847,14.6460595 C50.2654257,14.9790724 50.6188879,15.4086645 50.867783,15.9342936 C50.9535207,16.115436 51.2078087,16.1318789 51.3131984,15.9612166 C51.6587084,15.4020693 52.0926067,14.9572088 52.6160818,14.6260932 C53.2755671,14.2088784 54.3190437,14 55.7475172,14 C56.4751905,14 57.1544192,14.1414808 57.7878541,14.4239003 C58.420375,14.7068619 58.9730996,15.1041104 59.4441997,15.6153746 C59.9152998,16.1271809 60.2929842,16.7461368 60.5756077,17.4733264 C60.8582312,18.2001547 61,19.008113 61,19.8967497 L61,37.9787363 C61,38.5427623 60.5374005,39 59.9667607,39"
            id="Fill-4"
            fill="#444444"
          />
          <Path
            d="M35.6275727,32.3651797 C35.6275727,33.2081047 35.412083,33.9448357 34.9805713,34.5766981 C34.5490596,35.2084722 33.8758872,35.5245801 32.9610539,35.5245801 C32.1242016,35.5245801 31.4836764,35.2478752 31.0394784,34.695084 C30.5944819,34.1422044 30.3728708,33.3659819 30.3728708,32.3651797 C30.3728708,31.4701297 30.5622782,30.6666078 30.9415366,29.9559393 C31.3199077,29.2449174 31.7845103,28.6070473 32.3335699,28.0402088 C32.8826295,27.4743421 33.4574166,26.9874582 34.0591732,26.5788503 C34.2668559,26.4378474 34.4652236,26.3039124 34.6541874,26.1770452 C35.07044,25.8976899 35.6275727,26.1976302 35.6275727,26.6974128 L35.6275727,32.3651797 Z M37.5099361,15.5401646 C36.5163236,14.5133882 35.1961498,14 33.5493258,14 C32.7650816,14 32.0849894,14.0789828 31.5102023,14.2367717 C30.934528,14.3950024 30.4316891,14.6123376 30.0001774,14.8885123 C29.8545955,14.9818958 29.7270227,15.0880897 29.5962562,15.1919865 L29.5962562,15.1759956 C29.5962562,15.1759956 29.137154,15.4798232 28.7623314,16.0089372 C28.7513307,16.0236913 28.7400639,16.0380036 28.7299503,16.0532878 C28.725071,16.0603556 28.7198368,16.0666283 28.7149574,16.0737844 C28.6965046,16.1013489 28.6849716,16.1271464 28.6738822,16.1528556 C28.532115,16.4142763 28.4924592,16.7089157 28.5573101,16.9817332 L28.5524308,16.9819099 C28.6354684,17.5021009 29.0783357,18.2011075 29.9646913,18.4477742 C30.0258162,18.4673873 30.0874734,18.4843501 30.1509936,18.4937149 C30.1727289,18.4978673 30.191093,18.5055535 30.2132718,18.5090874 C30.2588715,18.5120029 30.2962207,18.5081156 30.3372072,18.5074088 C30.3498935,18.5072321 30.3623137,18.5072321 30.3749113,18.5067904 C30.431423,18.5040516 30.4832328,18.4977789 30.5312278,18.4883257 C30.7656139,18.4500712 30.9929028,18.3450259 31.1858588,18.1739848 L31.1897622,18.1754867 C31.1897622,18.1754867 31.2008517,18.1642666 31.217264,18.1484523 C31.2236515,18.1426214 31.2309262,18.138469 31.237225,18.1323731 L31.2357168,18.1310478 C31.3132541,18.0592212 31.4934351,17.9070865 31.7901881,17.7284476 C31.8174237,17.7123683 31.8459901,17.700088 31.8728708,17.6829485 C32.2976402,17.4130465 32.8434173,17.2781396 33.5101136,17.2781396 C34.2159333,17.2781396 34.7319908,17.5149113 35.058907,17.9888965 C35.3854684,18.4627933 35.5491483,19.0815802 35.5491483,19.8452573 L35.549237,20.353433 C35.549237,20.8048895 35.3639106,21.2370862 35.0298084,21.5424157 C34.7358055,21.8110809 34.4121718,22.0747103 34.0591732,22.3333039 C33.4835877,22.7548105 32.8826295,23.1961954 32.2552342,23.65631 C31.6277502,24.117308 31.0003549,24.6306079 30.3728708,25.1965629 C29.7453868,25.7633131 29.1828424,26.4011832 28.6864798,27.1122051 C28.1895848,27.8229619 27.7846877,28.6324914 27.4707239,29.5409703 C27.1572924,30.4493609 27,31.4961922 27,32.6808459 C27,33.8133744 27.1502839,34.7739784 27.4511178,35.5640715 C27.7515969,36.3539878 28.1504613,37.0057285 28.6472676,37.5192934 C29.1436302,38.0325932 29.7062633,38.4077173 30.3336586,38.6444891 C30.9611427,38.8816141 31.588538,39 32.216022,39 C33.2092796,39 34.0064762,38.808904 34.6078779,38.4272422 C35.0773598,38.1295989 35.4511178,37.7874285 35.7295067,37.4009075 C35.8351668,37.2539854 36.057044,37.268386 36.1462917,37.4256448 L36.2939141,37.6858287 C36.5606813,38.1562799 37.0611249,38.4471204 37.6037083,38.4471204 L37.6060149,38.4471204 C38.3758872,38.4471204 39,37.8255947 39,37.0589137 L39,19.8452573 C39,18.0023253 38.5031938,16.5670294 37.5099361,15.5401646 Z"
            id="Fill-5"
            fill="#444444"
          />
          <Path
            d="M8.62633082,32.4652894 C8.62633082,33.6218122 8.35138593,34.4087386 7.80184308,34.8250761 C7.25221351,35.2422256 6.63285028,35.4503943 5.94236565,35.4503943 C5.2523147,35.4503943 4.65159915,35.2085685 4.1407394,34.7244657 C3.62909906,34.2403629 3.37366918,33.4875448 3.37366918,32.4652894 L3.37366918,24.7999529 L3.37410285,24.7999529 L3.37410285,19.430608 C3.37531712,18.5732092 3.63664486,17.9223549 4.15990748,17.4797595 C4.68317011,17.0362618 5.29056413,16.8143776 5.98070182,16.8143776 C6.67118644,16.8143776 7.28456507,17.029765 7.82092443,17.4599081 C8.35771747,17.8901415 8.62633082,18.5488461 8.62633082,19.4363829 L8.62633082,32.4652894 Z M10.4475588,15.0193625 C9.41222218,13.9843841 8.08962452,13.4664438 6.47915869,13.4664438 C5.73758809,13.4664438 5.10495465,13.5672346 4.58143182,13.768726 C4.40319468,13.8373937 4.23909508,13.9144531 4.08895956,14.0002652 C3.76587763,14.1846123 3.37410285,13.9338534 3.37410285,13.5503609 L3.37366918,13.5506316 L3.37366918,7.02088384 C3.37366918,6.32455186 2.71805139,5.83295971 2.08324961,6.05312947 L0.670449207,6.54282672 C0.270087818,6.68169608 0,7.07150484 0,7.51058109 L0,36.9115455 C0,37.7531534 0.655791262,38.4352285 1.46466698,38.4352285 C1.93944563,38.4352285 2.38352065,38.1911468 2.6510932,37.7832914 L2.65152687,37.7826597 C2.81770807,37.5292841 3.16325395,37.4794752 3.37991399,37.6875536 C3.60160457,37.9003242 3.87438112,38.1294271 4.19824365,38.374772 C4.74735282,38.7913801 5.50765784,39 6.47915869,39 C7.34796719,39 8.12102201,38.8185404 8.79875682,38.4557115 C9.4756243,38.0926118 10.0507535,37.6084188 10.5241444,37.0035836 C10.996668,36.398207 11.361035,35.7063867 11.6168986,34.9259571 C11.8718948,34.1465201 12,33.326117 12,32.4652894 L12,19.4363829 C12,17.5271321 11.482375,16.054792 10.4475588,15.0193625 Z"
            id="Fill-6"
            fill="#444444"
          />
          <Path
            d="M17.4734633,19.8523869 C17.4734633,19.0087749 17.7167138,18.3693211 18.2036613,17.9342908 C18.6906087,17.4996143 19.2893585,17.2820992 19.9998214,17.2820992 C20.6839411,17.2820992 21.2760828,17.5191633 21.7761572,17.9937337 C22.2739991,18.4664466 22.523947,19.3066972 22.525733,20.5119204 C22.52484,21.4272709 22.4594731,22.2385962 22.328918,22.9452771 C22.1969341,23.6573539 21.9470755,24.3033536 21.5788957,24.8830106 C21.2099122,25.4634638 20.6966215,25.9969465 20.0392023,26.4846085 C19.3125763,27.0005767 18.5292454,27.2596666 17.9803245,27.1138898 C17.932996,27.1041596 17.8879893,27.0892989 17.8444114,27.0693961 C17.8352136,27.065504 17.824587,27.0641771 17.8156571,27.0599312 L17.8158357,27.0567468 C17.6186635,26.9547561 17.4734633,26.7548439 17.4734633,26.5053074 L17.4734633,19.8523869 Z M18.2876916,30.8526028 C19.5674356,30.5484885 20.4512279,30.1944845 21.3418068,29.6283614 C22.420896,28.9431754 23.3018306,28.1787322 23.9864861,27.3346779 C24.670695,26.4915966 25.1768418,25.5160956 25.5064444,24.4084402 C25.8331002,23.3084805 25.9974996,21.9476619 25.9996428,20.3269574 L25.9999107,20.3269574 C25.9999107,20.3229768 25.9997321,20.3191732 25.9997321,20.3151926 C25.9997321,20.3087353 26,20.3026318 26,20.2961744 L25.9993749,20.2961744 C25.9961601,19.2810448 25.8385474,18.3883393 25.5261795,17.6181464 C25.2101503,16.8406116 24.7762465,16.1814319 24.2235749,15.6409611 C23.6709034,15.1010211 23.0327727,14.6919087 22.3090936,14.4149506 C21.5850573,14.1384348 20.8153892,14 19.9998214,14 C19.1573746,14 18.3680607,14.1253432 17.6317011,14.3754104 C16.8944486,14.6263622 16.2558714,15.0018611 15.7172198,15.5026148 C15.1772288,16.0035453 14.7560054,16.6164622 14.4540854,17.3411883 C14.1545766,18.058661 14.0039292,18.8852893 14.0006251,19.821604 L14,19.821604 L14,33.0203238 L14.0006251,33.0192623 C14.0038399,33.9561962 14.1544873,34.7967122 14.4540854,35.5402797 C14.7560054,36.2913659 15.1707099,36.9239201 15.6974847,37.4379423 C16.2234559,37.9520529 16.8418515,38.3413511 17.5523143,38.6045983 C18.2632237,38.868111 19.0390534,39 19.8814109,39 C20.6966215,39 21.4667361,38.868111 22.1907724,38.6045983 C22.9140051,38.3413511 23.5389195,37.9520529 24.0657836,37.4379423 C24.5917547,36.9239201 25.00637,36.2913659 25.3092722,35.5402797 C25.6011014,34.8140498 25.7491591,33.993525 25.7590713,33.0828627 L25.7653222,33.0819782 L25.7653222,32.389981 C25.7653222,31.7297399 25.1335318,31.2633074 24.5006697,31.4285446 L24.4948653,31.4244756 C24.4948653,31.4244756 23.1320732,31.74177 22.7090638,32.047388 L22.6959369,32.0525185 C22.6882572,32.0590643 22.6830778,32.0679985 22.6755767,32.0747212 C22.6651287,32.0834784 22.6522697,32.0922356 22.6435184,32.1010813 L22.6479833,32.1050618 C22.5944932,32.1572513 22.5416282,32.2099716 22.4973359,32.2702991 C22.4817086,32.2907326 22.4707248,32.3135544 22.4567049,32.3353148 C22.4127698,32.4035149 22.3757107,32.4755187 22.3455276,32.5519453 C22.3440095,32.5563682 22.3422235,32.5605256 22.3407948,32.5649485 C22.2915017,32.6939184 22.2568537,32.8303187 22.2531924,32.9757416 C22.2515851,32.9826412 22.2499777,32.9895409 22.2499777,32.9895409 C22.2499777,33.8070581 22.0260158,34.4327127 21.5788957,34.867743 C21.1309719,35.3027733 20.5656199,35.5202884 19.8814109,35.5202884 C19.1442477,35.5202884 18.5591606,35.3027733 18.1247209,34.867743 C17.6909064,34.4327127 17.4734633,33.8070581 17.4734633,32.9895409 L17.4734633,31.8709168 C17.4735526,31.4158069 17.841018,30.9587508 18.2876916,30.8526028 Z"
            id="Fill-7"
            fill="#444444"
          />
          <Path
            d="M73.4116105,21.4378851 C73.925786,22.0688587 74.8173193,22.5737265 76.0340114,22.5737265 C77.5604245,22.5737265 78.4857281,21.8164693 78.4857281,20.806645 C78.4857281,19.6863448 77.2516684,19.3866212 75.9828737,19.0709124 C74.6118035,18.7396623 73.1714561,18.4083234 73.1714561,17.0196485 C73.1714561,15.899526 74.199807,15 75.9828737,15 C77.4060465,15 78.2975798,15.5206754 78.8292193,16.1519155 L78.450993,16.4676243 C77.9714561,15.8363842 77.0972903,15.4261847 75.9828737,15.4261847 C74.5432982,15.4261847 73.6865,16.1203002 73.6865,17.0196485 C73.6865,18.0139316 74.8346868,18.2663211 76.0523438,18.5659558 C77.4745517,18.8974723 79,19.2603377 79,20.806645 C79,21.9901757 78.0399614,23 76.0340114,23 C74.7314465,23 73.8235105,22.6526759 73,21.7849428 L73.4116105,21.4378851"
            id="Fill-9"
            fill="#444444"
          />
          <Path
            d="M89.5484752,17.3758954 C89.5484752,16.1636612 89.0825489,15.4365208 87.9829631,15.4365208 C87.1705572,15.4365208 86.1768637,16.0989881 85.726186,16.8910745 L85.726186,23 L85.273814,23 L85.273814,17.3758954 C85.273814,16.1636612 84.8070407,15.4365208 83.7091491,15.4365208 C82.8958961,15.4365208 81.9326995,16.1151791 81.4506777,16.9071745 L81.4506777,23 L81,23 L81,15.1940193 L81.4506777,15.1940193 L81.4506777,16.4223536 C81.752259,15.9052416 82.7459526,15 83.7836973,15 C84.9281815,15 85.5152485,15.7597044 85.665192,16.4870267 C86.0718185,15.7597044 87.0502636,15 88.0583584,15 C89.3832831,15 90,15.8243775 90,17.3758954 L90,23 L89.5484752,23 L89.5484752,17.3758954"
            id="Fill-10"
            fill="#444444"
          />
          <Path
            d="M98.508227,19.5129048 C97.9020452,18.7396623 96.9341842,18.3451817 95.9017377,18.3451817 C94.459634,18.3451817 93.5415962,19.2761453 93.5415962,20.4596761 C93.5415962,21.6428516 94.459634,22.5737265 95.9017377,22.5737265 C96.9341842,22.5737265 97.9020452,22.1793346 98.508227,21.4063586 L98.508227,19.5129048 Z M98.508227,21.879611 C97.7710288,22.6526759 96.8852837,23 95.7707212,23 C94.3775181,23 93,22.0845776 93,20.4596761 C93,18.8343306 94.3609103,17.9192633 95.7707212,17.9192633 C96.8852837,17.9192633 97.7710288,18.2663211 98.508227,19.0392971 L98.508227,17.3196386 C98.508227,16.0887737 97.4923881,15.4261847 96.279102,15.4261847 C95.2457327,15.4261847 94.4762417,15.7732425 93.7381209,16.6252567 L93.3607566,16.3098143 C94.1311702,15.4419924 94.951407,15 96.279102,15 C97.836537,15 99,15.7574348 99,17.3038309 L99,22.8105747 L98.508227,22.8105747 L98.508227,21.879611 Z"
            id="Fill-11"
            fill="#444444"
          />
          <Path
            d="M101,15.1464246 L101.459087,15.1464246 L101.459087,16.5772676 C102.11714,15.6504913 102.92851,15 104,15 L104,15.5854239 C103.862188,15.5691342 103.770026,15.5691342 103.632214,15.5691342 C102.851852,15.5691342 101.795866,16.3822483 101.459087,17.1138223 L101.459087,23 L101,23 L101,15.1464246"
            id="Fill-12"
            fill="#444444"
          />
          <Path
            d="M106.350748,21.4530178 L106.350748,15.5359054 L105,15.5359054 L105,15.1053104 L106.350748,15.1053104 L106.350748,13 L106.856091,13 L106.856091,15.1053104 L108.510805,15.1053104 L108.510805,15.5359054 L106.856091,15.5359054 L106.856091,21.4530178 C106.856091,22.1066748 107.126811,22.5691358 107.733792,22.5691358 C108.139397,22.5691358 108.493707,22.3779398 108.696034,22.1546085 L109,22.5215612 C108.678936,22.8085347 108.341724,23 107.733792,23 C106.788649,23 106.350748,22.4098955 106.350748,21.4530178"
            id="Fill-13"
            fill="#444444"
          />
          <Path
            d="M110.52845,18.7238547 L116.502995,18.7238547 C116.502995,17.256408 115.556152,15.4261847 113.507861,15.4261847 C111.58273,15.4261847 110.574744,17.2248815 110.52845,18.7238547 Z M113.52271,15 C115.81994,15 117,16.8778238 117,18.9922294 L117,19.1498618 L110.52845,19.1498618 C110.574744,21.0118779 111.769653,22.5737265 113.678188,22.5737265 C114.734215,22.5737265 115.586723,22.1793346 116.2855,21.4220774 L116.565011,21.721801 C115.804218,22.5266587 114.935114,23 113.678188,23 C111.505865,23 110,21.3116015 110,18.9922294 C110,16.7831555 111.505865,15 113.52271,15 Z"
            id="Fill-14"
            fill="#444444"
          />
          <Path
            d="M119,15.1464246 L119.459087,15.1464246 L119.459087,16.5772676 C120.11714,15.6504913 120.92851,15 122,15 L122,15.5854239 C121.861326,15.5691342 121.770026,15.5691342 121.632214,15.5691342 C120.851852,15.5691342 119.795866,16.3822483 119.459087,17.1138223 L119.459087,23 L119,23 L119,15.1464246"
            id="Fill-15"
            fill="#444444"
          />
          <Path
            d="M79.4991223,31.8115084 C78.9991826,30.9851544 77.8492275,30.2236286 76.5998472,30.2236286 C74.6338555,30.2236286 73.5499337,31.8439681 73.5499337,33.9010544 C73.5499337,35.9587789 74.6338555,37.562615 76.5998472,37.562615 C77.8492275,37.562615 78.9991826,36.8334577 79.4991223,36.0071037 L79.4991223,31.8115084 Z M79.4991223,36.4934517 C78.94947,37.3033023 77.867049,38 76.5998472,38 C74.4331292,38 73,36.3796605 73,33.9010544 C73,31.4390428 74.4331292,29.7862436 76.5998472,29.7862436 C77.7995149,29.7862436 78.8491069,30.4021568 79.4991223,31.3252516 L79.4991223,27 L80,27 L80,37.8055155 L79.4991223,37.8055155 L79.4991223,36.4934517 Z"
            id="Fill-16"
            fill="#444444"
          />
          <Path
            d="M82.5284502,33.7241686 L88.5029948,33.7241686 C88.5029948,32.2562053 87.5561517,30.4260024 85.5078612,30.4260024 C83.5827302,30.4260024 82.5747442,32.225212 82.5284502,33.7241686 Z M85.5235837,30 C87.8199401,30 89,31.8778917 89,33.9922739 L89,34.1500821 L82.5284502,34.1500821 C82.5747442,36.0119 83.7696531,37.5739976 85.6781882,37.5739976 C86.7342151,37.5739976 87.5867232,37.1796101 88.2855004,36.4218285 L88.5650112,36.7220816 C87.8042176,37.5263976 86.9351136,38 85.6781882,38 C83.5058647,38 82,36.3116203 82,33.9922739 C82,31.7831357 83.5058647,30 85.5235837,30 Z"
            id="Fill-17"
            fill="#444444"
          />
          <Path
            d="M97.495336,32.5537856 C97.495336,30.9214222 96.6520158,30.4363339 95.3884585,30.4363339 C94.2757312,30.4363339 93.0795257,31.1313572 92.5056126,31.9069709 L92.5056126,38 L92,38 L92,30.1941081 L92.5056126,30.1941081 L92.5056126,31.4224284 C93.1127273,30.7114871 94.3260079,30 95.4558103,30 C97.0732016,30 98,30.7114871 98,32.5537856 L98,38 L97.495336,38 L97.495336,32.5537856"
            id="Fill-18"
            fill="#444444"
          />
          <Path
            d="M100.349798,36.4529281 L100.349798,30.5358156 L99,30.5358156 L99,30.1053104 L100.349798,30.1053104 L100.349798,28 L100.856091,28 L100.856091,30.1053104 L102.510805,30.1053104 L102.510805,30.5358156 L100.856091,30.5358156 L100.856091,36.4529281 C100.856091,37.1069441 101.126811,37.569405 101.733792,37.569405 C102.139397,37.569405 102.493707,37.3779398 102.696034,37.1545187 L103,37.5212919 C102.678936,37.8085347 102.341724,38 101.733792,38 C100.788649,38 100.349798,37.4098058 100.349798,36.4529281"
            id="Fill-19"
            fill="#444444"
          />
          <Path
            d="M108.509074,34.5129435 C107.901876,33.7396208 106.934789,33.3452333 105.902184,33.3452333 C104.458936,33.3452333 103.540757,34.2758314 103.540757,35.4596155 C103.540757,36.6428667 104.458936,37.5739976 105.902184,37.5739976 C106.934789,37.5739976 107.901876,37.1796101 108.509074,36.4062875 L108.509074,34.5129435 Z M108.509074,36.879357 C107.77084,37.6526797 106.885881,38 105.770225,38 C104.376807,38 103,37.0848541 103,35.4596155 C103,33.8343768 104.360197,32.9193197 105.770225,32.9193197 C106.885881,32.9193197 107.77084,33.2665512 108.509074,34.0393411 L108.509074,32.3193464 C108.509074,31.089028 107.492156,30.4260024 106.278683,30.4260024 C105.246078,30.4260024 104.475546,30.7733227 103.737312,31.6252387 L103.360812,31.3095333 C104.130421,30.4420763 104.950784,30 106.278683,30 C107.836358,30 109,30.7572488 109,32.3038053 L109,37.8105768 L108.509074,37.8105768 L108.509074,36.879357 Z"
            id="Fill-20"
            fill="#444444"
          />
          <Polygon
            id="Fill-21"
            fill="#444444"
            points="112 38 112.5 38 112.5 27 112 27"
          />
          <Path
            d="M122.481237,30 C123.687769,30 124.374391,30.4736024 125,31.2780072 L124.664852,31.5620976 C124.069321,30.7262555 123.36723,30.4260024 122.511315,30.4260024 C120.618161,30.4260024 119.503581,32.0041739 119.503581,33.9922739 C119.503581,35.9802851 120.618161,37.5739976 122.511315,37.5739976 C123.36723,37.5739976 124.069321,37.2582923 124.664852,36.4218285 L125,36.7220816 C124.374391,37.5263976 123.687769,38 122.481237,38 C120.344027,38 119,36.1852493 119,33.9922739 C119,31.7986768 120.344027,30 122.481237,30"
            id="Fill-22"
            fill="#444444"
          />
          <Path
            d="M132.508227,34.5129435 C131.902045,33.7396208 130.934184,33.3452333 129.901738,33.3452333 C128.458711,33.3452333 127.540674,34.2758314 127.540674,35.4596155 C127.540674,36.6428667 128.458711,37.5739976 129.901738,37.5739976 C130.934184,37.5739976 131.902045,37.1796101 132.508227,36.4062875 L132.508227,34.5129435 Z M132.508227,36.879357 C131.770106,37.6526797 130.885284,38 129.770721,38 C128.377518,38 127,37.0848541 127,35.4596155 C127,33.8343768 128.36091,32.9193197 129.770721,32.9193197 C130.885284,32.9193197 131.770106,33.2665512 132.508227,34.0393411 L132.508227,32.3193464 C132.508227,31.089028 131.492388,30.4260024 130.279102,30.4260024 C129.245733,30.4260024 128.475319,30.7733227 127.738121,31.6252387 L127.360757,31.3095333 C128.13117,30.4420763 128.951407,30 130.279102,30 C131.836537,30 133,30.7572488 133,32.3038053 L133,37.8105768 L132.508227,37.8105768 L132.508227,36.879357 Z"
            id="Fill-23"
            fill="#444444"
          />
          <Path
            d="M135,30.1461551 L135.459087,30.1461551 L135.459087,31.5772302 C136.11714,30.6502391 136.92851,30 138,30 L138,30.5850779 C137.861326,30.5690622 137.770026,30.5690622 137.632214,30.5690622 C136.851852,30.5690622 135.795866,31.3820212 135.459087,32.1138948 L135.459087,38 L135,38 L135,30.1461551"
            id="Fill-24"
            fill="#444444"
          />
          <Path
            d="M140.527643,33.7241686 L146.502933,33.7241686 C146.502933,32.2562053 145.555972,30.4260024 143.507425,30.4260024 C141.582928,30.4260024 140.573942,32.225212 140.527643,33.7241686 Z M143.52315,30 C145.820666,30 147,31.8778917 147,33.9922739 L147,34.1500821 L140.527643,34.1500821 C140.573942,36.0119 141.769,37.5739976 143.678647,37.5739976 C144.733932,37.5739976 145.58742,37.1796101 146.285411,36.4218285 L146.564957,36.7220816 C145.804068,37.5263976 144.935729,38 143.678647,38 C141.505179,38 140,36.3116203 140,33.9922739 C140,31.7831357 141.505179,30 143.52315,30 Z"
            id="Fill-25"
            fill="#444444"
          />
        </Svg>

        <Text style={styles.nameText}>{this.state.member.name}</Text>

        <View style={styles.addressSection}>
          <Text style={styles.addressText}>
            {this.state.member.shipping_address}
          </Text>
          <Text style={styles.addressText}>
            {this.state.member.shipping_city},{' '}
            {this.state.member.shipping_state}{' '}
            {this.state.member.shipping_zip_code}
          </Text>
        </View>

        <Text style={styles.historyTitle}>Brushing History</Text>
        <View style={styles.listArea}>
          <FlatList
            data={this.state.brushingData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigate('Entry', {
                    memberId: this.state.member.id,
                    entry: item,
                  })
                }>
                <Text style={styles.brushingItem}>
                  {`${this.brushingHistoryDateFormat(
                    item.startDate,
                  )} for  ${this.brushingDurationFormat(
                    item.durationInSeconds,
                  )}`}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <TouchableHighlight
          onPress={() => navigate('Entry', {memberId: this.state.member.id})}>
          <View style={styles.addButton}>
            <Text style={styles.buttonText}>
              <Icon name="plus" /> Add Entry
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  logoImage: {
    width: 147,
    height: 39,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  nameText: {
    backgroundColor: '#00c9f0',
    color: '#ffffff',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  addressSection: {
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
  },
  addressText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#daff00',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 15,
    paddingLeft: 20,
    textAlign: 'center',
  },
  historyTitle: {
    backgroundColor: '#00c9f0',
    color: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  listArea: {
    height: '65%',
  },
  brushingItem: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
  },
});

export default MemberComponent;
