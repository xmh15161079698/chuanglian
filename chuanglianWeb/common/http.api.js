// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
//登录部分
let loginUrl = '/wx/onlogin';
let getPhoneNumberUrl = '/wx/getphone';
let updateWXInfoUrl = '/user/updatewx';
let loginByPhoneUrl = '/user/loginPhone';
let getCodeUrl = '/user/code';
let loginByPasswordUrl = '/user/loginpass';
let resetUrl = '/user/resetpass';
let outLoginUrl = '/user/outlogin';
// 通知公告
let noticePageUrl = '/notice/pagelist';
let noticeDetailUrl = '/notice/detail';
// 任务部分
let surveyListUrl = '/survey/surveypagelist';
let surveyDetailUrl = '/survey/detail';
let surveyInfoListUrl = '/survey/surveyinfo';
let updateSurveyStatusUrl = '/survey/updatestatus';
let surveyInfoDetailUrl = '/survey/surveyinfodetail';
let addSurveyInfoUrl = '/survey/addsurveyinfo';
let distributeListUrl = '/survey/distributelist';
let distributeUrl = '/survey/distribute';
let taskPieDataUrl = '/survey/taskpie';
let taskLineDataUrl = '/survey/weekline';
let surveySaveUrl = '/survey/savesurvey';
let addConcatUrl = '/survey/addconcat';
let getConcatListUrl = '/survey/concatlist';
let updateLevelUrl = '/survey/updatelevel';
// 地区部分
let areaListUrl = '/area/list';
// 用户信息部分
let updateLocationUrl = '/user/updatelocation';
let updateWorkUrl = '/user/updatework';
let getUserUrl = '/user/getuser';
let getUserDetailUrl = '/user/userdetail';
let updateBaseInfoUrl = '/user/updatebaseinfo';
let isAreaUserUrl = '/user/isAreaUser';
let getAreaUserUrl = '/user/areaUserList';
// 管控区域
let pathPageUrl = '/path/pagelist';
let pathDetailUrl = '/path/detail';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 登录
	let onLogin = (params = {}) => vm.$u.post(loginUrl, params);
	let getPhoneNumber = (params = {}) => vm.$u.post(getPhoneNumberUrl, params);
	let updateWXInfo = (params = {}) => vm.$u.post(updateWXInfoUrl, params);
	let loginByPhone = (params = {}) => vm.$u.post(loginByPhoneUrl, params);
	let getCode = (params = {}) => vm.$u.post(getCodeUrl, params);
	let loginByPassword = (params = {}) => vm.$u.post(loginByPasswordUrl, params);
	let resetPassword = (params = {}) => vm.$u.post(resetUrl, params);
	let outLogin = (params = {}) => vm.$u.post(outLoginUrl, params);
	// 通知公告
	let getNoticePageList = (params = {}) => vm.$u.get(noticePageUrl, params);
	let getNoticeDetail = (params = {}) => vm.$u.get(noticeDetailUrl, params);
	// 任务部分
	let getSurveyPageList = (params = {}) => vm.$u.get(surveyListUrl, params);
	let getSurveyDetail = (params = {}) => vm.$u.get(surveyDetailUrl, params);
	let getSurveyInfoList = (params = {}) => vm.$u.get(surveyInfoListUrl, params);
	let updateSurveyStatus = (params = {}) => vm.$u.post(updateSurveyStatusUrl, params);
	let getSurveyInfoDetail = (params = {}) => vm.$u.get(surveyInfoDetailUrl, params);
	let addSurveyInfo = (params = {}) => vm.$u.post(addSurveyInfoUrl, params);
	let getDistributeList = (params = {}) => vm.$u.get(distributeListUrl, params);
	let distribute = (params = {}) => vm.$u.post(distributeUrl, params);
	let getTaskPie = (params = {}) => vm.$u.get(taskPieDataUrl,params);
	let getTaskLine = (params = {}) => vm.$u.get(taskLineDataUrl, params);
	let saveSurvey = (params = {}) => vm.$u.post(surveySaveUrl, params);
	let addConcat = (params = {}) => vm.$u.post(addConcatUrl, params);
	let getConcatList = (params = {}) => vm.$u.get(getConcatListUrl, params);
	let updateLevel = (params = {}) => vm.$u.get(updateLevelUrl, params);
	// 地区部分
	let getAreaList = (params = {}) => vm.$u.get(areaListUrl,params);
	// 用户信息部分
	let updateLocation = (params = {}) => vm.$u.post(updateLocationUrl, params);
	let updateWork = (params ={}) => vm.$u.post(updateWorkUrl, params);
	let getUser = (params = {}) =>vm.$u.get(getUserUrl, params);
	let getUserDetail = (params = {}) => vm.$u.get(getUserDetailUrl, params);
	let updateBaseInfo = (params = {}) => vm.$u.post(updateBaseInfoUrl, params);
	let isAreaUser = (params = {}) => vm.$u.get(isAreaUserUrl, params);
	let getAreaUser = (params = {}) => vm.$u.get(getAreaUserUrl, params);
	// 管控区域
	let GetPathPageList = (params = {}) => vm.$u.get(pathPageUrl, params);
	let GetPathDetail = (params = {}) => vm.$u.get(pathDetailUrl, params);
 
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		// 登录
		onLogin,
		getPhoneNumber,
		updateWXInfo,
		loginByPhone,
		getCode,
		loginByPassword,
		resetPassword,
		outLogin,
		// 通知公告
		getNoticePageList,
		getNoticeDetail,
		// 任务部分
		getSurveyPageList,
		getSurveyDetail,
		getSurveyInfoList,
		updateSurveyStatus,
		getSurveyInfoDetail,
		addSurveyInfo,
		getDistributeList,
		distribute,
		getTaskPie,
		getTaskLine,
		saveSurvey,
		addConcat,
		getConcatList,
		updateLevel,
		// 地区部分
		getAreaList,
		// 用户信息部分
		updateLocation,
		updateWork,
		getUser,
		getUserDetail,
		updateBaseInfo,
		isAreaUser,
		getAreaUser,
		// 区域管控
		GetPathPageList,
		GetPathDetail
	};
}

export default {
	install
}
