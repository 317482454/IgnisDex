<template>
    <div class="main">
        <div class="head">
            <div class="jinse" style="font-weight: bold">
                Ignis DEX - HebeBlock
            </div>
            <div style="-webkit-box-pack: end;
    justify-content: flex-end;
    display: flex;
    position: absolute;
    right: 15px;">
                <ul style="display: flex;
    flex-direction: row;">
                    <li v-if="accountRS==''" @click="createIs=true;verifyToken='';createTokenModel=''">
                        {{$t("l.head.create")}}
                    </li>
                    <li v-if="accountRS==''" @click="importIs=true">{{$t("l.head.import")}}</li>
                    <li v-if="accountRS!=''">{{accountRS}}</li>
                    <li v-if="$i18n.locale=='en-US'" @click="language('zh-CN')">中文</li>
                    <li v-if="$i18n.locale=='zh-CN'" @click="language('en-US')">English</li>
                    <li @click="exit()" v-if="accountRS!=''">{{$t("l.head.exit")}}</li>
                </ul>
            </div>
        </div>
        <div class="middle">
            <div class="left">
                <div class="left_main">
<!--                    <div class="left_search">-->
<!--                        搜索框-->
<!--                    </div>-->
                    <div style="height: 200px">
                        <div class="left_list_top" style="position: relative">
                            <div style="overflow: hidden">
                                <div class="left_list_market hse">
                                    {{$t("l.middle.market")}}
                                </div>
                                <div class="left_list_price hse">
                                    {{$t("l.middle.price")}}
                                </div>
                                <div
                                        class="left_list_ups hse">
                                    {{$t("l.middle.ups")}}
                                </div>
                            </div>
                            <div style="margin-top: 2px">
                                <div @click="assetModelFn(item)" class="left_list left_list_hover"
                                     v-for="item in assetList">
                                    <div class="left_list_name bai">
                                        IGNIS / {{item.property}}
                                    </div>
                                    <div class="left_list_price1 bai">
                                        {{dexPrice(item.property)}}
                                    </div>
                                    <div
                                            v-if="dexState(item.property).indexOf('-')==-1"
                                            class="left_list_ups1">
                                        {{dexState(item.property)}}
                                    </div>
                                    <div
                                            v-if="dexState(item.property).indexOf('-')!=-1"
                                            style="color: rgb(234, 0, 112);"
                                            class="left_list_ups1">
                                        {{dexState(item.property)}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="height: 8px;width: 100%;background-color: #000"></div>
                    <div class="left_record">
                        <div class="jinse" style=";font-size: 12px;padding-left: 10px">
                            {{$t("l.middle.deal")}}
                        </div>
                        <div style="overflow: hidden;margin-top: 4px;padding-bottom: 4px">
                            <div style="width: 34%;" class="left_list_name hse">
                                {{$t("l.middle.price")}} {{this.assetModel.property}}
                            </div>
                            <div style="width: 28%" class="left_list_price1 hse">
                                {{$t("l.middle.sum")}} IGNIS
                            </div>
                            <div class="left_list_ups1 hse">
                                {{$t("l.middle.time")}}
                            </div>
                        </div>
                        <div style="position: relative;width: 100%;overflow-x: hidden;height: 200px;">
                            <div style="padding-top: 4px;overflow: hidden" v-for="item in trades">
                                <div v-if="item.tradeType=='buy'"
                                     class="left_list_name" style="color: rgb(234, 0, 112)">
                                    {{$g.toFn($g.decimals(item.quantityQNT
                                    ,decimals)/($g.decimals(item.quantityQNT
                                    ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                                </div>
                                <div v-if="item.tradeType=='sell'"
                                     class="left_list_name" style="color: rgb(0, 192, 135)">
                                    {{$g.toFn($g.decimals(item.quantityQNT
                                    ,decimals)/($g.decimals(item.quantityQNT
                                    ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                                </div>
                                <div class="left_list_price1 bai">
                                    {{$g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2)
                                    }}
                                </div>
                                <div class="left_list_ups1 an">
                                    {{$g.formatDateTime1(item.timestamp * 1000 + (time - 500))}}
                                </div>
                            </div>
                        </div>
                        <div style="height: 12px;width: 100%"></div>
                    </div>
                </div>
            </div>
            <div id="trading"
                 style="position: absolute;left: 300px; right: 300px;height: 100%; background: rgb(18, 22, 28);">
                <div style="display: flex;
    font-size: 13px;
    padding: 20px 0 10px 0;">
                    <div style="float: left;width: 16%">
                        <div class="bai" style="float: left;padding: 0 6px 0 20px;font-size: 18px;">IGNIS /
                        </div>
                        <div class="bai" style="float: left;margin-top: 4px">{{assetModel.property}}</div>
                        <div style="width: 100%;clear: both;font-size: 12px">
                            <div class="an" style="float: left;margin-left: 20px">{{$t("l.trading.see")}}</div>
                        </div>
                    </div>
                    <div class="an" style="float: left;width: 20%;
    font-size: 12px;
    white-space: nowrap;">
                        {{$t("l.trading.latest")}}
                        <div style="margin-top: 6px;">
                            <div style="color: rgb(0, 192, 135);float: left">{{latestPrice}}</div>
                            <div class="bai" v-if="$i18n.locale=='zh-CN'" style="float: left;margin-left: 20px">¥
                                {{$g.toFn(latestPriceCny * this.latestPrice,
                                4)}}
                            </div>
                            <div class="bai" v-if="$i18n.locale=='en-US'" style="float: left;margin-left: 20px">$
                                {{$g.toFn(latestPriceUsd * this.latestPrice,
                                4)}}
                            </div>
                        </div>
                    </div>
                    <div class="an" style="float: left;width: 10%;
    font-size: 12px;
    white-space: nowrap;">
                        {{$t("l.trading.state")}}
                        <div style="margin-top: 6px;">
                            <div v-if="dexState(assetModel.property).indexOf('-')==-1"
                                 style="color: rgb(0, 192, 135);float: left">
                                {{ dexState(assetModel.property)}}
                            </div>
                            <div
                                    v-if="dexState(assetModel.property).indexOf('-')!=-1"
                                    style="color: rgb(234, 0, 112);"
                                    class="left_list_ups1">
                                {{dexState(assetModel.property)}}
                            </div>
                        </div>
                    </div>
                    <div class="an" style="float: left;width: 14%;
    font-size: 12px;
    white-space: nowrap;">
                        {{$t("l.trading.highest")}}
                        <div style="margin-top: 6px;">
                            <div class="bai" style="float: left">
                                {{dexModelFn(assetModel.property).highest}}
                            </div>
                        </div>
                    </div>
                    <div class="an" style="float: left;width: 14%;
    font-size: 12px;
    white-space: nowrap;">
                        {{$t("l.trading.lowest")}}
                        <div style="margin-top: 6px;">
                            <div class="bai" style="float: left">
                                {{dexModelFn(assetModel.property).lowest}}

                            </div>
                        </div>
                    </div>
                    <div class="an" style="float: left;width: 14%;
    font-size: 12px;
    white-space: nowrap;">
                        {{$t("l.trading.sum")}}
                        <div style="margin-top: 6px;">
                            <div class="bai" style="float: left">
                                {{dexModelFn(assetModel.property).closingSum.toFixed(6)}} {{assetModel.property}}
                                /
                                {{dexModelFn(assetModel.property).closingHebe.toFixed(2)}} IGNIS
                            </div>
                        </div>
                    </div>
                </div>
                <trading-vue
                        :color-back="'rgb(18, 22, 28)'"
                        :width="width"
                        :height="height"
                        :color-text="colors.colorText"
                        :colorTitle="colors.colorText"
                        :colorVolUp="'rgba(83, 185, 135, 0.65)'"
                        :colorVolDw="'rgba(235, 77, 92, 0.65)'"
                        :titleTxt="titleTxt" :data=this.$data></trading-vue>
            </div>
            <div class="right">
                <div class="right_top">
                    <div @click="state=0" v-bind:style="{'background':state==0 ? 'rgba(240, 185, 11, 0.15)':'none'}">
                        <img
                                src="https://dex-bin-1259603563.file.myqcloud.com/e743b35/static/media/red-green-D.6c2d36a2.svg"
                                alt="">
                    </div>
                    <div @click="state=1" v-bind:style="{'background':state==1 ? 'rgba(240, 185, 11, 0.15)':'none'}">
                        <img src="https://dex-bin-1259603563.file.myqcloud.com/e743b35/static/media/green-D.711a57d7.svg"
                             alt="">
                    </div>
                    <div @click="state=2" v-bind:style="{'background':state==2 ? 'rgba(240, 185, 11, 0.15)':'none'}">
                        <img
                                src="https://dex-bin-1259603563.file.myqcloud.com/e743b35/static/media/red-D.4001064a.svg"
                                alt="">
                    </div>
                </div>
                <div class="right_list_top">
                    <div class="right_list_top_price hse">
                        {{$t("l.middle.price")}} {{this.assetModel.property}}
                    </div>
                    <div class="right_list_sum hse">
                        {{$t("l.middle.sum")}} {{this.assetModel.property}}
                    </div>
                    <div class="right_list_count hse">
                        {{$t("l.middle.count")}} IGNIS
                    </div>
                </div>
                <div v-if="state==0||state==2" v-bind:style="{'height':state==2 ? '420px':''}" class="right_list"
                     id="dialogue_box">
                    <div @click="buyFn($g.toFn($g.decimals(item.quantityQNT
              ,decimals)/($g.decimals(item.quantityQNT
              ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum),
              $g.toFn($g.decimals(item.quantityQNT, decimals),assetModel.sum),
              $g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2))"
                         class="left_list_hover"
                         v-for="item in bidOrders"
                         style="overflow: hidden;padding-top: 2px;padding-bottom: 2px">
                        <div class="right_list_sum" style="color: rgb(234, 0, 112);">
                            {{$g.toFn($g.decimals(item.quantityQNT
                            ,decimals)/($g.decimals(item.quantityQNT
                            ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                        </div>
                        <div class="right_list_count bai">
                            {{$g.toFn($g.decimals(item.quantityQNT, decimals),assetModel.sum)}}
                        </div>
                        <div class="right_list_price bai"
                        >

                            {{$g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2) }}
                        </div>
                    </div>
                </div>
                <div style="height: 30px;margin-top: 4px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    font-size: 20px;
    -webkit-box-pack: start;
    justify-content: flex-start;
    cursor: pointer;
    font-weight: bold;
    background: rgba(37, 45, 56, 0.4);
    ">
                    <div style="color: rgb(234, 0, 112);
    display: flex;
    -webkit-box-pack: start;
    justify-content: flex-start;float: left;margin-left: 10px">{{latestPrice}}
                    </div>
                    <div v-if="$i18n.locale=='zh-CN'" class="jinse"
                         style=" font-size: 16px; margin-left: 20px;float: left">
                        ¥ {{$g.toFn(latestPriceCny * this.latestPrice, 4)}}
                    </div>

                    <div v-if="$i18n.locale=='en-US'" class="jinse"
                         style=" font-size: 16px; margin-left: 20px;float: left">
                        $ {{$g.toFn(latestPriceUsd * this.latestPrice, 4)}}
                    </div>


                </div>
                <div v-if="state==0||state==1"
                     v-bind:style="{'height':state==1 ? '420px':''}" class="right_list" style="margin-top: 6px">
                    <div @click="sellFn($g.toFn($g.decimals(item.quantityQNT
              ,decimals)/($g.decimals(item.quantityQNT
              ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum),
              $g.toFn($g.decimals(item.quantityQNT, decimals),assetModel.sum),
              $g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2))"
                         class="left_list_hover"
                         v-for="item in askOrders"
                         style="overflow: hidden;padding-top: 2px;padding-bottom: 2px">
                        <div class="right_list_sum" style="color: #00C087;">
                            {{$g.toFn($g.decimals(item.quantityQNT
                            ,decimals)/($g.decimals(item.quantityQNT
                            ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                        </div>
                        <div class="right_list_count bai">
                            {{$g.toFn($g.decimals(item.quantityQNT, decimals),assetModel.sum)}}

                        </div>
                        <div class="right_list_price bai"
                        >
                            {{$g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom">
            <div class="bottom_list_head">
                <div class="bottom_list_head1">
                    <div class="an" @click="state1=0" :class="{ 'jinse': state1==0 }"
                         v-bind:style="{'background':state1==0 ? 'rgba(240, 185, 11, 0.15)':'none'}">
                        {{$t("l.bottom.state1")}}
                    </div>
                    <div class="an" @click="state1=1" :class="{ 'jinse': state1==1 }"
                         v-bind:style="{'background':state1==1 ? 'rgba(240, 185, 11, 0.15)':'none'}">
                        {{$t("l.bottom.state2")}}
                    </div>
                    <div class="an" @click="state1=2" :class="{ 'jinse': state1==2 }"
                         v-bind:style="{'background':state1==2 ? 'rgba(240, 185, 11, 0.15)':'none'}">
                        {{$t("l.bottom.state3")}}
                    </div>
                </div>
                <div v-if="state1==0" class="bottom_list_head_current">
                    <div class="bottom_list_head_current_top">
                        <div class="bottom_list_head_current_top_div hse" style="">
                            TxHash
                        </div>
                        <div class="bottom_list_head_current_top_div hse"
                             style="text-align: right; ">
                            {{$t("l.bottom.height")}}
                        </div>
                        <div class="bottom_list_head_current_top_div hse"
                             style="text-align: right;">
                            {{$t("l.middle.price")}} {{assetModel.property}}
                        </div>
                        <div class="bottom_list_head_current_top_div hse"
                             style="text-align: right; ">
                            {{$t("l.middle.sum")}} {{assetModel.property}}
                        </div>
                        <div class="bottom_list_head_current_top_div hse"
                             style="text-align: right;">
                            {{$t("l.middle.count")}} IGNIS
                        </div>
                        <div class=" bottom_list_head_current_top_div hse"
                             style="text-align: right;  width: 10%;padding-right: 10px">
                            {{$t("l.bottom.operation")}}
                        </div>
                    </div>
                    <div style="overflow-y: auto;height: 180px">
                        <div v-for="item in list" class="left_list_hover bottom_list_head_current_top"
                             style="margin-top: 0px;padding-top: 2px;padding-bottom: 2px">
                            <div class="bottom_list_head_current_top_div an">
                                {{item.order}}
                            </div>
                            <div class="bottom_list_head_current_top_div an"
                                 style="text-align: right; ">
                                {{item.height}}
                            </div>
                            <div v-if="item.type=='bid'" class="bottom_list_head_current_top_div"
                                 style="text-align: right;color: rgb(234, 0, 112);; !important;">
                                {{$g.toFn($g.decimals(item.quantityQNT
                                ,decimals)/($g.decimals(item.quantityQNT
                                ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                            </div>
                            <div v-if="item.type!='bid'" class="bottom_list_head_current_top_div "
                                 style="text-align: right;color: rgb(0, 192, 135); !important;">
                                {{$g.toFn($g.decimals(item.quantityQNT
                                ,decimals)/($g.decimals(item.quantityQNT
                                ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                            </div>
                            <div class="bottom_list_head_current_top_div bai"
                                 style="text-align: right; ">
                                {{$g.toFn($g.decimals(item.quantityQNT, decimals),assetModel.sum)}}
                            </div>
                            <div class="bottom_list_head_current_top_div bai"
                                 style="text-align: right;">
                                {{$g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2) }}
                            </div>
                            <div @click="cancel(item)" class=" bottom_list_head_current_top_div bai"
                                 style="text-align: right;  width: 10%;padding-right: 10px;line-height: 14px">
                                {{$t("l.middle.cancel")}}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="state1==1" class="bottom_list_head_current">
                    <div class="bottom_list_head_current_top">
                        <div class="bottom_list_head_current_top_div1 hse" style="">
                            TxHash
                        </div>
                        <div class="bottom_list_head_current_top_div1 hse"
                             style="text-align: right; ">
                            {{$t("l.middle.time")}}
                        </div>
                        <div class="bottom_list_head_current_top_div1 hse"
                             style="text-align: right;">
                            {{$t("l.middle.price")}} {{assetModel.property}}
                        </div>
                        <div class="bottom_list_head_current_top_div1 hse"
                             style="text-align: right; ">
                            {{$t("l.middle.sum")}} {{assetModel.property}}
                        </div>
                        <div class="bottom_list_head_current_top_div1 hse"
                             style="text-align: right;padding-right: 10px">
                            {{$t("l.middle.count")}} IGNIS
                        </div>

                    </div>
                    <div style="overflow-y: auto;height: 180px">
                        <div v-for="item in accountTrades" class="left_list_hover bottom_list_head_current_top"
                             style="margin-top: 0px;padding-top: 2px;padding-bottom: 2px">
                            <div class="bottom_list_head_current_top_div1 an">
                                {{item.block}}
                            </div>
                            <div class="bottom_list_head_current_top_div1 an"
                                 style="text-align: right; ">
                                {{$g.formatDateTime(item.timestamp * 1000 + (time - 500))}}
                            </div>
                            <div v-if="item.tradeType=='sell'" class="bottom_list_head_current_top_div1"
                                 style="text-align: right;color: rgb(234, 0, 112);; !important;">
                                {{$g.toFn($g.decimals(item.quantityQNT
                                ,decimals)/($g.decimals(item.quantityQNT
                                ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                            </div>
                            <div v-if="item.tradeType!='sell'" class="bottom_list_head_current_top_div1 "
                                 style="text-align: right;color: rgb(0, 192, 135); !important;">
                                {{$g.toFn($g.decimals(item.quantityQNT
                                ,decimals)/($g.decimals(item.quantityQNT
                                ,decimals)*item.priceNQTPerShare/1000000)*s,assetModel.sum)}}
                            </div>
                            <div class="bottom_list_head_current_top_div1 bai"
                                 style="text-align: right; ">
                                {{$g.toFn($g.decimals(item.quantityQNT, decimals),assetModel.sum)}}
                            </div>
                            <div class="bottom_list_head_current_top_div1 bai"
                                 style="text-align: right;padding-right: 10px">
                                {{$g.toFn($g.decimals1(item.quantityQNT,item.priceNQTPerShare/1000000 ,decimals),2) }}
                            </div>

                        </div>
                    </div>
                </div>
                <div v-if="state1==2" class="bottom_list_head_current">
                    <div class="bottom_list_head_current_top">
                        <div class="bottom_list_head_current_top_div2 hse">
                            {{$t("l.bottom.asset")}}id
                        </div>
                        <div class="bottom_list_head_current_top_div2 hse">
                            {{$t("l.bottom.assetName")}}
                        </div>
                        <div class="bottom_list_head_current_top_div2 hse">
                            {{$t("l.bottom.assetSum")}}
                        </div>
                    </div>
                    <div style="overflow-y: auto;height: 180px">
                        <div v-for="item in getAccountAssetsList" class="left_list_hover bottom_list_head_current_top"
                             style="margin-top: 0px;padding-top: 2px;padding-bottom: 2px">
                            <div class="bottom_list_head_current_top_div2 an">
                                {{item.asset}}
                            </div>
                            <div class="bottom_list_head_current_top_div2 an">
                                {{item.name.toUpperCase()}}
                            </div>

                            <div class="bottom_list_head_current_top_div2 bai">
                                {{$g.toFn($g.decimals(item.quantityQNT, decimals),4)}}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div style="position: absolute;
    right: 0px;
    width: 530px;
    height: 250px;
    z-index: 900;
    font-family: ProximaNova;
    background: rgb(18, 22, 28);
">
                <div style="height: 30px;
    line-height: 30px;
    box-shadow: rgb(11, 14, 17) 1px 3px 5px 0px;">
                    <div class="jinse" style="font-size: 12px;
    text-indent: 10px;">{{$t("l.bottom.title")}}
                    </div>
                </div>
                <div class="an" style="
    padding: 5px 25px;">
                    <div style="float: left;width: 50%">
                        <div style="font-size: 12px">
                            {{$t("l.middle.price")}} （{{myPrice(buy.price)}}）
                        </div>
                        <div style="display: flex;
            width: 88%;
margin-top: 4px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 30px;
    position: relative;
    background: rgb(37, 45, 56);
    border-radius: 3px;">
                            <input @change="computeBlur(0,buy)" v-model="buy.price" style="height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-indent: 10px;
    color: rgb(255, 255, 255);
    z-index: 300;
    position: relative;
    font-family: DINNext;
    width: 190px;
    padding-right: 35px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(51, 51, 51);
    border-image: initial;
    background: inherit;
    border-radius: 3px;
    transition: all 0.25s ease 0s;-webkit-appearance: none;" width="190px" height="30px" step="0.00000001"
                                   min="0.00000001" type="number"
                                   value="0.00954075">
                            <div style="position: absolute;
    top: 0px;
        right: 10px;
    z-index: 600;
    color: rgb(130, 138, 152);">
                                {{this.assetModel.property}}
                            </div>
                        </div>
                        <div style="font-size: 12px;margin-top: 4px">
                            {{$t("l.middle.sum")}} ({{mySum()}} {{this.assetModel.property}})
                        </div>
                        <div style="display: flex;
            width: 88%;
margin-top: 4px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 30px;
    position: relative;
    background: rgb(37, 45, 56);
    border-radius: 3px;">
                            <input @change="computeBlur(0,buy)" v-model="buy.sum" style="height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-indent: 10px;
    color: rgb(255, 255, 255);
    z-index: 300;
    position: relative;
    font-family: DINNext;
    width: 190px;
    padding-right: 35px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(51, 51, 51);
    border-image: initial;
    background: inherit;
    border-radius: 3px;
    transition: all 0.25s ease 0s;-webkit-appearance: none;" width="190px" height="30px" step="0.00000001"
                                   min="0.00000001" type="number"
                                   value="0.00954075">
                            <div style="position: absolute;
    top: 0px;
        right: 10px;
    z-index: 600;
    color: rgb(130, 138, 152);">
                                {{this.assetModel.property}}
                            </div>
                        </div>
                        <div style="font-size: 12px;margin-top: 4px">
                            {{$t("l.middle.count")}}
                        </div>
                        <div style="display: flex;
            width: 88%;
margin-top: 4px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 30px;
    position: relative;
    background: rgb(37, 45, 56);
    border-radius: 3px;">
                            <input @blur="computeBlur(1,buy)" v-model="buy.count" style="height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-indent: 10px;
    color: rgb(255, 255, 255);
    z-index: 300;
    position: relative;
    font-family: DINNext;
    width: 190px;
    padding-right: 35px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(51, 51, 51);
    border-image: initial;
    background: inherit;
    border-radius: 3px;
    transition: all 0.25s ease 0s;-webkit-appearance: none;" width="190px" height="30px" step="0.00000001"
                                   min="0.00000001" type="number"
                                   value="0.00954075">
                            <div style="position: absolute;
    top: 0px;
        right: 10px;
    z-index: 600;
    color: rgb(130, 138, 152);">
                                IGNIS
                            </div>
                        </div>
                        <button @click="buyFnHebe" style="text-align: center;
            margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: rgb(33, 40, 51);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
                width: 88%;

    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    overflow: hidden;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    outline: none;
    background: linear-gradient(90deg, rgb(0, 192, 135), rgb(65, 222, 221));">
                            {{$t("l.bottom.buy")}}IGNIS
                        </button>
                    </div>
                    <div style="float: left;width: 50%">
                        <div style="font-size: 12px">
                            {{$t("l.middle.price")}} （{{myPrice(sell.price)}}）
                        </div>
                        <div style="display: flex;
            width: 88%;
margin-top: 4px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 30px;
    position: relative;
    background: rgb(37, 45, 56);
    border-radius: 3px;">
                            <input @change="computeBlur(0,sell)" v-model="sell.price" style="height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-indent: 10px;
    color: rgb(255, 255, 255);
    z-index: 300;
    position: relative;
    font-family: DINNext;
    width: 190px;
    padding-right: 35px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(51, 51, 51);
    border-image: initial;
    background: inherit;
    border-radius: 3px;
    transition: all 0.25s ease 0s;-webkit-appearance: none;" width="190px" height="30px" step="0.00000001"
                                   min="0.00000001" type="number"
                                   value="0.00954075">
                            <div style="position: absolute;
    top: 0px;
        right: 10px;
    z-index: 600;
    color: rgb(130, 138, 152);">
                                {{this.assetModel.property}}
                            </div>
                        </div>
                        <div style="font-size: 12px;margin-top: 4px">
                            {{$t("l.middle.sum")}} ({{balanceNQT}} IGNIS）
                        </div>
                        <div style="display: flex;
            width: 88%;
margin-top: 4px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 30px;
    position: relative;
    background: rgb(37, 45, 56);
    border-radius: 3px;">
                            <input @change="computeBlur(1,sell)" v-model="sell.count" style="height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-indent: 10px;
    color: rgb(255, 255, 255);
    z-index: 300;
    position: relative;
    font-family: DINNext;
    width: 190px;
    padding-right: 35px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(51, 51, 51);
    border-image: initial;
    background: inherit;
    border-radius: 3px;
    transition: all 0.25s ease 0s;-webkit-appearance: none;" width="190px" height="30px" step="0.00000001"
                                   min="0.00000001" type="number"
                                   value="0.00954075">
                            <div style="position: absolute;
    top: 0px;
        right: 10px;
    z-index: 600;
    color: rgb(130, 138, 152);">
                                IGNIS
                            </div>
                        </div>

                        <div style="font-size: 12px;margin-top: 4px">
                            {{$t("l.middle.count")}}
                        </div>
                        <div style="display: flex;
            width: 88%;
margin-top: 4px;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    line-height: 30px;
    position: relative;
    background: rgb(37, 45, 56);
    border-radius: 3px;">
                            <input @change="computeBlur(0,sell)" v-model="sell.sum" style="height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    text-indent: 10px;
    color: rgb(255, 255, 255);
    z-index: 300;
    position: relative;
    font-family: DINNext;
    width: 190px;
    padding-right: 35px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(51, 51, 51);
    border-image: initial;
    background: inherit;
    border-radius: 3px;
    transition: all 0.25s ease 0s;-webkit-appearance: none;" width="190px" height="30px" step="0.00000001"
                                   min="0.00000001" type="number"
                                   value="0.00954075">
                            <div style="position: absolute;
    top: 0px;
        right: 10px;
    z-index: 600;
    color: rgb(130, 138, 152);">
                                {{this.assetModel.property}}
                            </div>
                        </div>
                        <button @click="sellFnHebe" style="text-align: center;
            margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: rgb(33, 40, 51);
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
                width: 88%;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    overflow: hidden;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    outline: none;
   background: linear-gradient(90deg, rgb(234, 0, 112), rgb(252, 84, 179));">
                            {{$t("l.bottom.sell")}}IGNIS
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="box" @click="is=false" v-if="is">
            <div style="position: absolute;width: 80px;height: 80px;top: 50%;margin-top: -40px;left: 50%;margin-left: -40px">
                <div class="loader-17"></div>
            </div>
        </div>
        <div v-if="qrIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.qrIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <p>
                                <img id="imgSrc"
                                     style="height: 100%; width: 100%;"></p>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="qrIs=false" type="button" class="ant-btn">
                                    <span>{{$t("l.qrIs.cancel")}}</span></button>
                                <button @click="qrIs=false;scanIs=true;start()" type="button"
                                        class="ant-btn ant-btn-primary"><span>{{$t("l.qrIs.scan")}}</span>
                                </button>
                                <button @click="qrIs=false;getAccountAsset()" type="button"
                                        class="ant-btn ant-btn-primary">
                                    <span>{{$t("l.qrIs.ok")}}</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="scanIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.scanIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <p>
                                <video width="472" height="388" v-if="videoIs" class="video-view" ref="video" autoplay
                                       playsinline="true"
                                       webkit-playsinline="true"></video>
                                <canvas ref="canvas" width="478" height="850" style="display: none"></canvas>
                            </p>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="scanIs=false;stop()" type="button" class="ant-btn">
                                    <span>{{$t("l.scanIs.cancel")}}</span></button>
                                <button @click="start()" type="button" class="ant-btn ant-btn-primary">
                  <span>
                  {{$t("l.scanIs.start")}}
                  </span>
                                </button>
                                <button @click="scanIs=true;stop()" type="button" class="ant-btn ant-btn-primary">
                  <span>
                  {{$t("l.scanIs.stop")}}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="broadcastIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{broadcastState}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <p>
                                {{broadcastTxt}}
                            </p>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="broadcastIs=false" type="button" class="ant-btn"><span>OK</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="createIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.createIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <div style="text-align: left;font-size: 14px">
                                {{$t("l.createIs.txt1")}}
                            </div>
                            <div style="text-align: left;font-size: 14px">
                                {{$t("l.createIs.txt2")}}
                            </div>
                            <div style="text-align: left;font-size: 14px">
                                {{$t("l.createIs.txt3")}}
                            </div>
                            <div style="text-align: left;font-size: 14px">
                                {{$t("l.createIs.txt4")}}
                            </div>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="createIs=false" type="button" class="ant-btn">
                  <span>
                    {{$t("l.createIs.cancel")}}
                  </span>
                                </button>
                                <button @click="createIs=false;createTokenIs=true;createToken()" type="button"
                                        class="ant-btn ant-btn-primary">
                  <span>
                      {{$t("l.createIs.ok")}}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="createTokenIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.createTokenIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
              <textarea style="width:100%;height:50px;margin-bottom:10px;padding:3px;
    border: 1px solid #e8e8e8;
    font-size: 18px;
    border-radius: 4px 4px 0 0;" v-model="createTokenModel" rows="1" readonly=""></textarea>
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.createTokenIs.txt1")}}
                            </div>
                            <div style="text-align: left;font-size: 14px">
                                {{$t("l.createTokenIs.txt2")}}
                            </div>
                            <div>
                                {{$t("l.createTokenIs.txt3")}}
                            </div>
                            <div style="text-align: left;font-size: 14px">
                                {{$t("l.createTokenIs.txt4")}}
                            </div>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="createTokenIs=false" type="button" class="ant-btn">
                  <span>
                    {{$t("l.createTokenIs.cancel")}}
                  </span>
                                </button>
                                <button @click="createTokenIs=false;createTokenVerifyIs=true;" type="button"
                                        class="ant-btn ant-btn-primary">
                  <span>
                      {{$t("l.createTokenIs.ok")}}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="createTokenVerifyIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.createTokenVerifyIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.createTokenVerifyIs.txt1")}}
                            </div>
                            <textarea
                                    v-model="verifyToken"
                                    style="margin-top: 16px;width:100%;height:50px;margin-bottom:10px;padding:3px;border: 1px solid #e8e8e8;font-size: 18px;border-radius: 4px 4px 0 0;"
                                    rows="1"></textarea>
                            <div v-if="createTokenVerifyIss" style="color: rgb(234, 0, 112);">
                                {{$t("l.createTokenVerifyIs.txt2")}}
                            </div>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="createTokenVerifyIs=false" type="button" class="ant-btn">
                  <span>
                    {{$t("l.createTokenVerifyIs.cancel")}}
                  </span>
                                </button>
                                <button @click="verifyTokenFn" type="button" class="ant-btn ant-btn-primary">
                  <span>
                      {{$t("l.createTokenVerifyIs.ok")}}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="importIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.importIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.importIs.txt1")}}
                            </div>
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.importIs.txt2")}}
                            </div>

                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="importIs=false" type="button" class="ant-btn">
                  <span>
                    {{$t("l.importIs.cancel")}}
                  </span>
                                </button>
                                <!--                <button @click="importIs=false;importQrIs=true;start()" type="button" class="ant-btn ant-btn-primary">-->
                                <!--                  <span>-->
                                <!--                      {{$t("l.importIs.qr")}}-->
                                <!--                  </span>-->
                                <!--                </button>-->
                                <button @click="importIs=false;importTokenIs=true" type="button"
                                        class="ant-btn ant-btn-primary">
                  <span>
                      {{$t("l.importIs.token")}}
                  </span>
                                </button>
                                <!--                <button @click="importIs=false;importAddrIs=true" type="button" class="ant-btn ant-btn-primary">-->
                                <!--                  <span>-->
                                <!--                      {{$t("l.importIs.addr")}}-->
                                <!--                  </span>-->
                                <!--                </button>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="importTokenIs" style="position: fixed;top: 0;height: 100%;width: 100%;z-index: 10001">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-wrap">
                <div class="ant-modal">
                    <div class="ant-modal-content">
                        <div class="ant-modal-header">
                            <div class="ant-modal-title">{{$t("l.importTokenIs.title")}}</div>
                        </div>
                        <div class="ant-modal-body">
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.importTokenIs.txt1")}}
                            </div>
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.importTokenIs.txt2")}}
                            </div>
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.importTokenIs.txt3")}}
                            </div>
                            <div style="text-align: left;font-size: 14px;">
                                {{$t("l.importTokenIs.txt4")}}
                            </div>
                            <textarea
                                    v-model="verifyToken"
                                    style="margin-top: 16px;width:100%;height:50px;margin-bottom:10px;padding:3px;border: 1px solid #e8e8e8;font-size: 18px;border-radius: 4px 4px 0 0;"
                                    rows="1"></textarea>
                        </div>
                        <div class="ant-modal-footer">
                            <div>
                                <button @click="importTokenIs=false" type="button" class="ant-btn">
                  <span>
                    {{$t("l.importTokenIs.cancel")}}
                  </span>
                                </button>
                                <button @click="importFn" type="button" class="ant-btn ant-btn-primary">
                  <span>
                      {{$t("l.importTokenIs.ok")}}
                  </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

    import TradingVue from 'trading-vue-js'
    import QRCode from "qrcode";
    import jsQR from "jsqr";

    export default {
        name: 'app',
        components: {TradingVue},
        data() {
            return {
                topIs: false,
                dexModel: [],
                importQrIs: false,
                addrTxt: '',
                addr: '',
                importTokenIs: false,
                importIs: false,
                createTokenVerifyIss: false,
                createTokenVerifyIs: false,
                createTokenIs: false,
                createIs: false,
                broadcastTxt: '',
                broadcastState: '',
                broadcastIs: false,
                qrIs: false,
                scanIs: false,
                is: false,
                state1: 0,
                state: 0,
                time: 1514296800000,
                titleTxt: 'IGNIS / USDT',
                colors: {
                    colorText: 'rgb(132, 142, 156)',
                },
                ohlcv: [],
                width: 1080,
                height: 442,
                api: "https://testnode8.ardor.tools",
                assetList: [],
                assetModel: {
                    property: '',
                    value: '',
                    sum: 0
                },
                timeInterval: null,
                trades: [],
                s: 1,
                bidOrders: [],
                askOrders: [],
                buy: {
                    price: '',
                    sum: '',
                    count: ''
                },
                sell: {
                    price: '',
                    sum: '',
                    count: ''
                },
                latestPrice: '0',
                latestPriceUsd: '0',
                latestPriceCny: '0',
                accountRS: '',
                publickey: '',
                token: '',
                list: [],
                accountTrades: [],
                getAccountAssetsList: [],
                cameraWidth: 0,
                cameraHeight: 0,
                stream: '',
                timer: '',
                videoIs: false,
                model: '',
                balanceNQT: 0,
                createTokenModel: '',
                verifyToken: '',
                contract: 'http://localhost:3000'
            }
        },
        methods: {
            language(txt) {
                this.$i18n.locale = txt;
                localStorage.setItem('lang', txt);
            },
            test() {

            },
            dex() {
                this.$http.get(this.contract + "/dex").then(res => {
                    this.dexModel = res;
                    this.dexdex()
                })
            },
            dexdex() {
                this.$http.get(this.contract + "/dex/dex?type=" + this.assetModel.property).then(res => {

                   this.ohlcv=res;
                })
            },
            dexModelFn(txt) {
                let model = {
                    highest: 0,
                    lowest: 0,
                    closingHebe: 0,
                    closingSum: 0
                };
                this.dexModel.forEach(item => {
                    if (item.txt.toLowerCase() == txt.toLowerCase()) {
                        model = item.model
                    }
                })
                return model;
            },
            dexState(txt) {
                let sum = 0 + "%";
                this.dexModel.forEach(item => {
                    if (item.txt.toLowerCase() == txt.toLowerCase()) {
                        if (parseFloat(item.model.closing) > parseFloat(item.model.opening)) {
                            sum = "+" + ((item.model.closing - item.model.opening) / item.model.opening * 100).toFixed(2) + "%"
                        }
                        if (parseFloat(item.model.closing) < parseFloat(item.model.opening)) {
                            sum = "-" + ((item.model.opening - item.model.closing) / item.model.opening * 100).toFixed(2) + "%"
                        }
                    }
                })
                return sum;
            },
            dexPrice(txt) {
                let sum = 0;
                this.dexModel.forEach(item => {
                    if (item.txt.toLowerCase() == txt.toLowerCase()) {
                        sum = item.model.closing
                    }
                })
                return sum;
            },
            importFn() {
                this.importTokenIs = false
                if (this.verifyToken != '') {
                    let model = this.$hebejs.parseToken(this.verifyToken);
                    this.accountRS = model.accountRS.accountRS
                    this.publickey = model.publickey;
                    this.token = model.token;
                    this.verifyToken = ''
                    this.getAccountAsset()
                }
            },
            exit() {
                this.accountRS = '';
                this.token = '';
                this.publickey = ''
                this.getAccountAsset();
                this.balanceNQT = 0;
                this.list = []
                this.getAccountAssetsList = []
                this.accountTrades = []
            },
            verifyTokenFn() {
                if (this.verifyToken === this.createTokenModel) {
                    this.createTokenVerifyIss = false;
                    this.createTokenVerifyIs = false;
                    let model = this.$hebejs.parseToken(this.createTokenModel);
                    this.accountRS = model.accountRS.accountRS
                    this.publickey = model.publickey;
                    this.token = model.token;
                    this.verifyToken = ''
                    this.createTokenModel = ''
                } else {
                    this.createTokenVerifyIss = true;
                }
            },
            createToken() {
                this.createTokenModel = this.$hebejs.createToken();
            },
            qr(unsignedTransactionBytes) {
                if (this.token != '') {
                    let model = {signed: ''}
                    model.signed = this.$hebejs.signTransactionBytes(unsignedTransactionBytes, this.token);
                    this.model = JSON.stringify(model)
                    this.broadcastTransaction()
                    return;
                }
                this.qrIs = true;
                let model = {
                    txt: 'Ignis',
                    unsignedTransactionBytes: unsignedTransactionBytes,
                    fee: '0.02'
                };
                this.$nextTick(() => {
                    QRCode.toDataURL(
                        JSON.stringify(model),
                        {errorCorrectionLevel: "H"},
                        function (err, url) {
                            document.getElementById("imgSrc").src = url;
                        }
                    );
                })
            },

            getAccount() {
                this.$http.get(this.api + "/nxt?requestType=getBalance&account=" + this.accountRS + "&chain=2").then(res => {
                    let balanceNQT = 0;
                    if (res.unconfirmedBalanceNQT) {
                        balanceNQT = res.unconfirmedBalanceNQT / 1000000
                        this.balanceNQT = Math.floor(balanceNQT * 100) / 100;
                    }
                })
            },
            async sellFnHebe() {
                if (parseFloat(this.sell.price) > 0 && parseFloat(this.sell.count) <= parseFloat(this.balanceNQT)) {
                    let formData = new FormData();
                    let sss = "1"
                    for (let i = 0; i < this.decimals; i++) {
                        sss = sss + "0"
                    }
                    if (3 > this.decimals) sss = 0.1
                    let s = 1;
                    for (let i = 0; i < (8 - this.decimals); i++) {
                        s = s + "0"
                    }
                    let quantityQNT = this.sell.sum * sss
                    let priceNQT = parseInt(parseFloat(this.sell.count) / parseFloat(this.sell.sum) * parseFloat(s))
                    formData.append("requestType", "placeBidOrder");
                    formData.append("publicKey", this.publickey);
                    formData.append("asset", this.assetModel.value);
                    formData.append("quantityQNT", parseInt(quantityQNT));
                    formData.append("asset_order_type", 'placeBidOrder');
                    formData.append("chain", 2);
                    formData.append("priceNQTPerShare", parseInt(priceNQT) * 1000000);
                    formData.append("feeNQT", -1);
                    formData.append("feeRateNQTPerFXT", -1);
                    formData.append("deadline", 1440);
                    this.is = true;
                    let res = await this.send(formData);
                    this.is = false;
                    if (res.unsignedTransactionBytes) {
                        this.qr(res.unsignedTransactionBytes)
                    } else {
                    }
                } else {
                    this.broadcastIs = true;
                    this.broadcastState = this.$t("l.method.err2")
                    this.broadcastTxt = this.$t("l.method.err3")
                }
            },
            async buyFnHebe() {
                let sum = this.mySum()
                if (parseFloat(this.buy.price) > 0 && parseFloat(this.buy.sum) <= parseFloat(sum)) {
                    let formData = new FormData();
                    let sss = "1"
                    for (let i = 0; i < this.decimals; i++) {
                        sss = sss + "0"
                    }
                    if (3 > this.decimals) sss = 0.1
                    let s = 1;
                    for (let i = 0; i < (8 - this.decimals); i++) {
                        s = s + "0"
                    }
                    let quantityQNT = this.buy.sum * sss
                    let priceNQT = parseInt(parseFloat(this.buy.count) / parseFloat(this.buy.sum) * parseFloat(s))
                    formData.append("requestType", "placeAskOrder");
                    formData.append("publicKey", this.publickey);
                    formData.append("asset", this.assetModel.value);
                    formData.append("quantityQNT", parseInt(quantityQNT));
                    formData.append("chain", 2);
                    formData.append("priceNQTPerShare", parseInt(priceNQT) * 1000000);
                    formData.append("asset_order_type", 'placeAskOrder');
                    formData.append("feeNQT", -1);
                    formData.append("feeRateNQTPerFXT", -1);
                    formData.append("deadline", 1440);

                    this.is = true;
                    let res = await this.send(formData);
                    this.is = false;

                    if (res.unsignedTransactionBytes) {
                        this.qr(res.unsignedTransactionBytes)
                    } else {
                    }
                } else {
                    this.broadcastIs = true;
                    this.broadcastState = this.$t("l.method.err2")
                    this.broadcastTxt = this.$t("l.method.err3")
                }
            },
            async broadcastTransaction() {
                if (this.model.indexOf("token") != -1) {
                    this.importQrIs = false;
                    let model = JSON.parse(this.model);
                    this.verifyToken = model.token;
                    this.importFn()
                    return;
                }
                if (this.model.indexOf("signed") != -1) {
                    let signed = JSON.parse(this.model).signed;
                    let formData = new FormData();
                    formData.append("requestType", "broadcastTransaction");
                    formData.append("transactionBytes", signed);
                    this.is = true;
                    let res = await this.send(formData);
                    this.is = false;
                    if (res.fullHash) {
                        this.broadcastIs = true;
                        this.broadcastState = this.$t("l.method.err4")
                        this.broadcastTxt = this.$t("l.method.err5") + "Hash:" + res.fullHash
                    } else {
                        this.broadcastIs = true;
                        this.broadcastState = this.$t("l.method.err6")
                        this.broadcastTxt = this.$t("l.method.err7")
                    }
                } else {
                    this.broadcastIs = true;
                    this.broadcastState = this.$t("l.method.err8")
                    this.broadcastTxt = this.$t("l.method.err9")
                }
                this.getAccountAsset()
            },
            send(formData) {
                return new Promise((resolve, reject) => {
                    this.$http.post(this.api + '/nxt', formData, {timeout: 5000}).then(res => {
                        resolve(res)
                    }).catch(error => {
                        resolve('')
                    })
                });
            },
            async cancel(item) {//取消订单
                let formData = new FormData();
                if (item.type == "ask") {
                    formData.append("requestType", "cancelAskOrder");
                } else {
                    formData.append("requestType", "cancelBidOrder");
                }
                formData.append("publicKey", this.publickey);
                formData.append("order", item.order);
                formData.append("chain", 2);
                formData.append("feeNQT", 2000000);
                formData.append("deadline", 1440);
                this.is = true;
                let res = await this.send(formData);
                this.is = false;
                if (res.unsignedTransactionBytes) {
                    this.qr(res.unsignedTransactionBytes)
                } else {
                }

            },
            computeBlur(txt, model) {
                console.log(txt);
                if (txt == 0) {
                    if (model.price != '' && model.sum != '') {
                        model.count = this.$g.toFn(parseFloat(model.sum) / (parseFloat(model.price)), 4)
                    }
                }
                if (txt == 1) {
                    if (model.price != '') {
                        model.sum = this.$g.toFn((model.count * model.price), 4)
                    }
                }
            },
            myPrice(sum) {
                let sum1 = this.latestPriceCny
                let type = "¥ "
                if (this.$i18n.locale == "en-US") {
                    sum1 = this.latestPriceUsd
                    type = "$ "
                }
                return type + this.$g.toFn(sum * sum1,
                    4)
            },
            mySum() {
                let sum = 0;
                this.getAccountAssetsList.forEach(item => {
                    if (item.asset == this.assetModel.value) {
                        sum = this.$g.toFn(this.$g.decimals(item.quantityQNT, this.decimals), 4)
                    }
                })
                return sum;
            },
            sellFn(price, sum, count) {
                this.buy = {
                    price: price,
                    sum: sum,
                    count: count
                }
                this.sell = {
                    price: price,
                    sum: sum,
                    count: count
                }
            },
            buyFn(price, sum, count) {
                this.buy = {
                    price: price,
                    sum: sum,
                    count: count
                }
                this.sell = {
                    price: price,
                    sum: sum,
                    count: count
                }
            },
            onResize(event) {
                this.width = document.getElementById("trading").offsetWidth
            },
            getAccountAssets() {
                this.$http.get(this.api + "/nxt?requestType=getAccountAssets&account=" + this.accountRS + "&includeAssetInfo=true&chain=2").then(res => {
                    this.getAccountAssetsList = res.accountAssets
                })
            },
            getTradesAccount() {
                this.$http.get(this.api + "/nxt?requestType=getTrades&asset=" + this.assetModel.value + "&account=" + this.accountRS + "&firstIndex=0&lastIndex=50&chain=2").then(res => {
                    this.accountTrades = res.trades
                })
            },
            getList() {
                this.$http.get(this.api + "/nxt?requestType=getAccountCurrentBidOrders&account=" + this.accountRS + "&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=100&chain=2").then(res => {
                    let bidOrders = res.bidOrders;
                    this.$http.get(this.api + "/nxt?requestType=getAccountCurrentAskOrders&account=" + this.accountRS + "&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=100&chain=2").then(res => {
                        let askOrders = res.askOrders;
                        let list = bidOrders.concat(askOrders);
                        this.list = list.sort(this.$g.compare("height", false))
                    })
                })
            },
            getAskOrders() {
                this.$http.get(this.api + "/nxt?requestType=getAskOrders&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=25&showExpectedCancellations=true&chain=2").then(res => {
                    let askOrder = res.askOrders
                    this.$http.get(this.api + "/nxt?requestType=getExpectedAskOrders&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=100&showExpectedCancellations=true&chain=2").then(ress => {
                        let askOrders = ress.askOrders
                        this.askOrders = []
                        this.askOrders = askOrders.concat(askOrder)
                    })
                })
            },
            getBidOrders() {

                this.$http.get(this.api + "/nxt?requestType=getBidOrders&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=25&showExpectedCancellations=true&chain=2").then(res => {
                    let bidOrder = res.bidOrders
                    this.$http.get(this.api + "/nxt?requestType=getExpectedBidOrders&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=100&showExpectedCancellations=true&chain=2").then(ress => {
                        let bidOrders = ress.bidOrders
                        this.bidOrders = []
                        this.bidOrders = bidOrders.concat(bidOrder)
                        this.bidOrders = this.bidOrders.sort(this.$g.compare("priceNQT", true))
                        console.log(this.bidOrders);
                        this.$nextTick(function () {
                            let div = document.getElementById('dialogue_box');
                            div.scrollTop = div.scrollHeight + 10;
                        })
                    })

                })
            },
            assetModelFn(item) {
                this.buy = {
                    price: '',
                    sum: '',
                    count: ''
                };
                this.sell = {
                    price: '',
                    sum: '',
                    count: ''
                }
                this.assetModel = {
                    property: item.property,
                    value: item.value.split('|')[0],
                    sum: item.value.split('|')[1],
                }
                this.titleTxt = "HEBE / " + this.assetModel.property
                this.getAccountAsset()
            },
            getAccountAsset() {
                this.$http.get(this.api + "/nxt?requestType=getAsset&asset=" + this.assetModel.value + "&chain=2").then(res => {
                    this.decimals = res.decimals
                    this.s = 1;
                    for (let i = 0; i < (8 - this.decimals); i++) {
                        this.s = this.s + "0"
                    }
                    if (this.accountRS != '') {
                        this.getAccount()
                        this.getList()
                        this.getAccountAssets()
                        this.getTradesAccount()

                    }
                    this.dex()
                    this.getTrades()
                    this.getBidOrders()
                    this.getAskOrders()
                })
            },
            getTrades() {
                this.$http.get(this.api + "/nxt?requestType=getTrades&asset=" + this.assetModel.value + "&firstIndex=0&lastIndex=50&chain=2").then(res => {
                    this.trades = res.trades
                    this.latestPriceUsd = 0
                    this.latestPriceCny = 0
                    if (this.trades.length > 0) {
                        this.latestPrice = this.$g.toFn(this.$g.decimals(this.trades[0].quantityQNT
                            , this.decimals) / (this.$g.decimals(this.trades[0].quantityQNT
                            , this.decimals) * this.trades[0].priceNQTPerShare / 1000000) * this.s, this.assetModel.sum)
                    }
                    this.$http.get("https://hebe.rmbtrade.com/?quotesTxt=" + this.assetModel.property.toLowerCase()).then(ress => {
                        if (ress.length > 0) {
                            this.latestPriceUsd = ress[0].ticker.price_usd
                            this.latestPriceCny = ress[0].ticker.price_cny
                        }
                    })
                })
            },
            getAccountProperties() {
                this.is = true;
                this.$http.get(this.api + "/nxt?requestType=getAccountProperties&recipient=ARDOR-8ZZY-VCTC-ELQ2-8PQH7&setter=ARDOR-8ZZY-VCTC-ELQ2-8PQH7&firstIndex=0&lastIndex=100&chain=2").then(res => {
                    this.is = false;
                    clearInterval(this.timeInterval);
                    this.timeInterval = null;
                    this.assetList = res.properties;
                    if (this.assetList.length == 0) {
                        window.alert(this.$t("l.method.err11"));
                        return;
                    }
                    if (this.assetModel.value == '') {
                        this.assetModel = {
                            property: this.assetList[0].property,
                            value: this.assetList[0].value.split('|')[0],
                            sum: this.assetList[0].value.split('|')[1],
                        }
                        this.titleTxt = "IGNIS / " + this.assetModel.property
                    }
                    this.getAccountAsset()
                    this.timeInterval = setInterval(() => {
                        this.getAccountAsset()
                    }, 10000);
                })

            },
        },
        mounted() {
            this.getAccountProperties();
            this.width = document.getElementById("trading").offsetWidth
            window.addEventListener('resize', this.onResize)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResize)
        },
    }

</script>
<style lang="less">
    .video-view {

        object-fit: cover;
        top: 0px;
        left: 0px;
        z-index: 80;
    }

    .ant-modal-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        height: 100%;
        background-color: rgba(0, 0, 0, .45);
        filter: alpha(opacity=50);
    }

    .ant-btn {
        line-height: 1.499;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        box-shadow: 0 2px 0 rgba(0, 0, 0, .015);
        cursor: pointer;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        touch-action: manipulation;
        height: 32px;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;
        color: rgba(0, 0, 0, .65);
        background-color: #fff;
        border: 1px solid #d9d9d9;
    }

    .ant-btn-primary {
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
    }

    .ant-modal-wrap {
        .ant-modal {
            width: 520px;
            transform-origin: -130px 485px;

            .ant-modal-content {
                .ant-modal-footer {
                    padding: 10px 16px;
                    text-align: right;
                    background: transparent;
                    border-top: 1px solid #e8e8e8;
                    border-radius: 0 0 4px 4px;
                }

                .ant-modal-body {
                    padding: 24px;
                    font-size: 14px;
                    line-height: 1.5;
                    word-wrap: break-word;
                }

                .ant-modal-header {
                    .ant-modal-title {
                        margin: 0;
                        color: rgba(0, 0, 0, .85);
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 22px;
                        word-wrap: break-word;
                    }

                    padding: 16px 24px;
                    color: rgba(0, 0, 0, .65);
                    background: #fff;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 4px 4px 0 0;
                }

                position: relative;
                background-color: #fff;
                background-clip: padding-box;
                border: 0;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
                pointer-events: auto;
            }

            box-sizing: border-box;
            color: rgba(0, 0, 0, .65);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5;
            list-style: none;
            font-feature-settings: "tnum";
            position: relative;
            top: 100px;
            margin: 0 auto;
            padding: 0 0 24px;
            pointer-events: none;
        }

        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        overflow: auto;
        outline: 0;
        -webkit-overflow-scrolling: touch;
    }

    .main {
        min-height: 830px;

        .bottom {
            .bottom_list_head {
                .bottom_list_head_current {
                    .bottom_list_head_current_top {
                        .bottom_list_head_current_top_div2 {
                            padding-left: 10px;
                            font-size: 12px;
                            float: left;
                            width: 33%;
                        }

                        .bottom_list_head_current_top_div1 {
                            padding-left: 10px;
                            font-size: 12px;
                            float: left;
                            width: 20%;
                        }

                        .bottom_list_head_current_top_div {
                            padding-left: 10px;
                            font-size: 12px;
                            float: left;
                            width: 18%;
                        }

                        overflow: hidden;
                        margin-top: 12px;
                        padding-bottom: 4px
                    }
                }

                .bottom_list_head1 {
                    div {
                        height: 22px;
                        line-height: 23px;
                        font-size: 12px;
                        margin-right: 6px;
                        cursor: pointer;
                        padding: 0px 5px;
                        border-radius: 2px;
                    }

                    height: 30px;
                    display: flex;
                    flex-direction: row;
                    box-shadow: rgb(11, 14, 17) 1px 3px 5px 0px;
                    -webkit-box-align: center;
                    align-items: center;
                    padding-left: 4px;
                }

                position: absolute;
                left: 0px;
                right: 540px;
                height: 250px;
                white-space: nowrap;
                z-index: 1000;
                background: rgb(18, 22, 28);
            }

            position: absolute;
            bottom: 0px;
            left: 0px;
            right: 0px;
            height: 250px;
            z-index: 1000;
            min-width: 500px;
        }

        .middle {
            min-width: 1360px;

            .right {
                .right_list {
                    .right_list_price {
                        padding-right: 10px;
                        text-align: right;
                        font-size: 12px;
                        float: left;
                        width: 38%
                    }

                    .right_list_count {
                        text-align: right;
                        font-size: 12px;
                        float: left;
                        width: 24%
                    }

                    .right_list_sum {
                        padding-left: 10px;
                        font-size: 12px;
                        float: left;
                        width: 38%;
                    }

                    height: 210px;
                    overflow-y: auto;
                }

                .right_list_top {
                    overflow: hidden;
                    margin-top: 10px;
                    padding-bottom: 6px;

                    .right_list_count {
                        padding-right: 10px;
                        text-align: right;
                        font-size: 12px;
                        float: left;
                        width: 38%
                    }

                    .right_list_sum {
                        text-align: right;
                        font-size: 12px;
                        float: left;
                        width: 24%
                    }

                    .right_list_top_price {
                        padding-left: 10px;
                        font-size: 12px;
                        float: left;
                        width: 38%
                    }
                }

                .right_top {
                    height: 30px;
                    display: flex;
                    box-shadow: rgb(11, 14, 17) 1px 3px 5px 0px;
                    display: flex;
                    -webkit-box-align: center;
                    align-items: center;
                    padding-left: 5px;

                    div {
                        border-radius: 3px;
                        cursor: pointer;
                        margin-right: 5px;
                        height: 22px;
                        padding: 0px 5px;

                        img {
                            width: 22px;
                        }
                    }
                }

                display: flex;
                flex-direction: column;
                width: 290px;
                background: rgb(19, 23, 34);
            }

            .left {
                display: flex;
                flex-direction: column;
                width: 290px;
                margin-right: 10px;

                .left_main {
                    .left_record {
                        position: relative;
                        margin-top: 8px;
                        -webkit-box-flex: 1;
                        width: 100%;
                        flex: 1 1 auto;

                        .left_list_ups1 {
                            padding-right: 10px;
                            text-align: right;
                            font-size: 12px;
                            color: rgb(0, 192, 135);
                            float: left;
                            width: 38%
                        }

                        .left_list_price1 {
                            text-align: right;
                            font-size: 12px;
                            float: left;
                            width: 24%
                        }

                        .left_list_name {
                            padding-left: 10px;
                            font-size: 12px;
                            float: left;
                            width: 38%
                        }
                    }

                    .left_list {
                        .left_list_ups1 {
                            padding-right: 10px;
                            text-align: right;
                            font-size: 12px;
                            color: rgb(0, 192, 135);
                            float: left;
                            width: 38%
                        }

                        .left_list_price1 {
                            text-align: right;
                            font-size: 12px;
                            float: left;
                            width: 24%
                        }

                        .left_list_name {
                            padding-left: 10px;
                            font-size: 12px;
                            float: left;
                            width: 38%
                        }

                        overflow: hidden;
                        padding-top: 2px;
                        padding-bottom: 2px;
                    }

                    .left_list_top {
                        .left_list_market {
                            padding-left: 10px;
                            font-size: 12px;
                            float: left;
                            width: 38%
                        }

                        .left_list_price {
                            text-align: right;
                            font-size: 12px;
                            float: left;
                            width: 24%
                        }

                        .left_list_ups {
                            padding-right: 10px;
                            text-align: right;
                            font-size: 12px;
                            float: left;
                            width: 38%
                        }

                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow-x: hidden;
                    }

                    .left_search {
                        padding-left: 10px;
                        display: flex;
                        flex-wrap: nowrap;
                        height: 30px;
                        -webkit-box-align: center;
                        align-items: center;
                        background: rgba(37, 45, 56, 0.4);
                        margin: 0px 0px 10px;
                    }

                    position: relative;
                    -webkit-box-flex: 1;
                    background: rgb(18, 22, 28);
                    flex: 1 1 auto;
                }
            }

            position: absolute;
            width: 100%;
            top: 60px;
            display: flex;
            bottom: 260px;
            -webkit-box-pack: justify;
            justify-content: space-between;
        }

        position: absolute;
        min-width: 1360px;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        background: rgb(0, 0, 0);

        .head {
            li {
                a {
                    height: 100%;
                    display: block;
                    color: inherit;
                    font-size: 13px;
                }

                height: 50px;
                line-height: 50px;
                margin-left: 15px;
                cursor: pointer;
                position: relative;
                padding: 0px 15px;

                &:hover {
                    background: rgb(37, 45, 56, 0.4);
                }
            }

            height: 50px;
            line-height: 50px;
            color: rgb(255, 255, 255);
            display: flex;
            flex-direction: row;
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0px;
            z-index: 1100;
            background: rgb(18, 22, 28);
            padding: 0px 15px;
        }
    }

    .left_list_hover {
        cursor: pointer;
    }

    .left_list_hover:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }

    .an {
        color: rgb(132, 142, 156) !important;

    }

    .jinse {
        color: rgb(245, 188, 0) !important;
    }


    .bai {
        color: rgba(255, 255, 255, 0.85) !important;
    }

    .hse {
        color: rgb(72, 81, 93) !important;
    }

    .box {
        position: relative;
        position: fixed;
        top: 0;
        height: 100%;
        width: 100%;
        display: inline-block;
        border: 1px solid currentcolor;
        border-radius: 3px;
        font-size: 30px;
        padding: 1em;
        margin-bottom: .25em;
        vertical-align: top;
        background-color: rgba(0, 0, 0, .45);
        z-index: 100000;
        color: rgb(245, 188, 0);

        .loader-17 {
            width: 20px;
            height: 20px;
            position: relative;
            background-color: currentcolor;
            border-radius: 50%;
        }

        .loader-17:after,
        .loader-17:before {
            content: "";
            position: absolute;
            width: .25em;
            height: .25em;
            border-radius: 50%;
            opacity: .8;
        }

        .loader-17:after {
            left: -.5em;
            top: -.25em;
            background-color: currentcolor;
            -webkit-transform-origin: .75em 1em;
            transform-origin: .75em 1em;
            -webkit-animation: loader-17 1s linear infinite;
            animation: loader-17 1s linear infinite;
            opacity: .6;
        }

        .loader-17:before {
            left: -1.25em;
            top: -.75em;
            background-color: currentcolor;
            -webkit-transform-origin: 1.5em 1em;
            transform-origin: 1.5em 1em;
            -webkit-animation: loader-17 2s linear infinite;
            animation: loader-17 2s linear infinite;
        }

        @-webkit-keyframes loader-17 {
            0% {
                -webkit-transform: rotateZ(0deg) translate3d(0, 0, 0);
                transform: rotateZ(0deg) translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: rotateZ(360deg) translate3d(0, 0, 0);
                transform: rotateZ(360deg) translate3d(0, 0, 0);
            }
        }
        @keyframes loader-17 {
            0% {
                -webkit-transform: rotateZ(0deg) translate3d(0, 0, 0);
                transform: rotateZ(0deg) translate3d(0, 0, 0);
            }
            100% {
                -webkit-transform: rotateZ(360deg) translate3d(0, 0, 0);
                transform: rotateZ(360deg) translate3d(0, 0, 0);
            }
        }
    }
</style>
