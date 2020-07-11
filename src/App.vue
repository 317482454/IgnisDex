<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  /*公共样式--开始*/
  html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
    margin: 0;
    padding: 0;
    font-family: DINNext,IBMPlexSans,Arial,PingFangSC-Regular,Microsoft YaHei,sans-serif!important;
  }
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: initial;
    font-family: DINNext,IBMPlexSans,Arial,PingFangSC-Regular,Microsoft YaHei,sans-serif!important;
  }
  * {
    box-sizing: border-box;
  }

  html, body {
    min-height: 100%;
  }

  body {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  ul, ol {
    list-style: none;
  }

  img {
    border: none;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: #232323;
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
  }

  input, textarea {
    outline: none;
    border: none;
  }

  textarea {
    resize: none;
    overflow: auto;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow: hidden;
  }

  .fl {
    float: left
  }

  .fr {
    float: right
  }

  .tl {
    text-align: left;
  }

  .tc {
    text-align: center
  }

  .tr {
    text-align: right;
  }

  .ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .inline {
    display: inline-block;
    *display: inline;
    *zoom: 1;
  }

  input {
    background: #fff;
    border: 0 none;
    resize: none;
    outline: none; /*清除选中效果的默认蓝色边框 */
    -webkit-appearance: none; /*清除浏览器默认的样式 */
    line-height: normal;
  }

  .box {
    position: relative;
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    display: inline-block;
    border-radius: 3px;
    font-size: 30px;
    color: rgba(200, 200, 200, 0.5);
    padding: 1em;
    margin-bottom: .25em;
    vertical-align: top;
    background-color: hsla(0, 0%, 100%, .9);
    color: #00a8ff;

  }

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
</style>
