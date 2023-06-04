import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "assets/scss/paper-dashboard.scss"
import "perfect-scrollbar/css/perfect-scrollbar.css"

import AdminLayout from "layouts/Admin.js"
import Login from "./views/Login"
import Home from "./views/Home"
import AboutUs from "./views/Pages/AboutUs"
import Volunteer from "./views/Pages/Volunteer"
import Contact from "./views/Pages/Contact"
import CaseList from "./views/Pages/CaseList"
import CaseDetail from "./views/Pages/CaseDetail"
import StoryList from "./views/Pages/StoryList"
import StoryDetail from "./views/Pages/StoryDetail"
import Blog from "./views/Pages/Blog"
import BlogSingle from "./views/Pages/BlogSingle"
import Register from "./views/Pages/Register"
import MealsDonate from "./views/Pages/MealsDonate"
import CartPage from "./views/Pages/CartPage"
import CheckOut from "./views/Pages/CheckOut"
import Impact from "views/Pages/Impact.jsx"
import FloodImpact from "./views/Pages/FloodImpact"
import Testinomial from "views/Pages/Testinomial"
import QuickDonate from "views/Pages/QuickDonate"
import PaymentDetail from "views/Pages/PaymentDetail"
import QurbaniDonate from "./views/Pages/QurbaniDonate"
import QurbaniCampaign from "./views/Pages/QurbaniCampaign"
import Disasterrelief from "views/Pages/Disasterrelief"
import DisasterReliefDonate from "views/Pages/DisasterReliefDonate"

import DonorCreatePassword from "./views/Pages/DonorCreatePassword"
import ResetPassword from "views/Pages/ResetPassword"
import DonorDashboard from "views/Pages/DonorDashboard"
import TermsAndConditions from "views/Pages/TermsAndConditions"
import Report_Subscription_List_Info_List from "views/Reports/Report_Subscription_Info_list"
//import Disasterrelief from "views/Pages/Disasterrelief";
// import DisasterReliefDonate from "views/Pages/DisasterReliefDonate";
import "font-awesome/css/font-awesome.min.css"
import RamazanCampaign from "views/Pages/RamazanCampaign"
import RamazanCampaignDonate from "views/Pages/RamazanCampaignDonate"
import FeaturedNGOs from "views/Pages/FeaturedNGOs"
import FeaturedNGOsDonate from "views/Pages/FeaturedNGOsDonate"
import NGOCaseList from "views/Pages/NGOCaseList"
import Ads from "views/Pages/Ads"
import SubscriptionQuickDonate from "views/Pages/SubscriptionQuickDonate"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

      <Route exact path="/login" component={Login}></Route>
      <Route exact path={["/", "/home"]} component={Home}></Route>
      <Route exact path="/about-us" component={AboutUs}></Route>
      <Route exact path="/volunteer" component={Volunteer}></Route>
      <Route exact path="/contact" component={Contact}></Route>
      <Route exact path="/cases-list" component={CaseList}></Route>
      <Route exact path="/cases-list/:id" component={NGOCaseList}></Route>
      <Route exact path="/case-detail/:id" component={CaseDetail}></Route>

      {/* <Route exact path="/case-detail" component={CaseDetail}></Route> */}
      <Route exact path="/story-list" component={StoryList}></Route>
      <Route exact path="/story-detail" component={StoryDetail}></Route>
      <Route exact path="/blogs" component={Blog}></Route>
      <Route exact path="/blog-single" component={BlogSingle}></Route>

      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/meals-donate" component={MealsDonate}></Route>
      <Route exact path="/quick-donate" component={QuickDonate}></Route>
      <Route
        exact
        path="/subscription-quick-donate"
        component={SubscriptionQuickDonate}
      ></Route>

      <Route exact path="/cart" component={CartPage}></Route>
      <Route exact path="/checkout" component={CheckOut}></Route>
      <Route exact path="/covid-impact" component={Impact}></Route>
      <Route exact path="/flood-impact" component={FloodImpact}></Route>
      <Route exact path="/testimonials" component={Testinomial}></Route>
      <Route exact path="/ads" component={Ads}></Route>
      {/* <Route exact path="/MarketingContentModule" component={MarketingContentModule}></Route> */}
      <Route exact path="/paymentDetail" component={PaymentDetail}></Route>

      <Route
        exact
        path="/DonorCreatePassword/:id"
        component={DonorCreatePassword}
      ></Route>
      <Route exact path="/ResetPassword/:id" component={ResetPassword}></Route>

      <Route exact path="/QurbaniCampaign" component={QurbaniCampaign}></Route>
      <Route exact path="/QurbaniDonate/:id" component={QurbaniDonate}></Route>
      <Route
        exact
        path="/TermsAndConditions"
        component={TermsAndConditions}
      ></Route>

      {/* <Route exact path="/Disasterrelief" component={Disasterrelief}></Route> 
       <Route exact path="/DisasterReliefDonate" component={DisasterReliefDonate}></Route>  */}

      <Route exact path="/DonorDashboard" component={DonorDashboard}></Route>
      <Route
        exact
        path="/Report_Subscription_Info_list"
        component={Report_Subscription_List_Info_List}
      ></Route>
      <Route exact path="/Disasterrelief" component={Disasterrelief}></Route>
      <Route exact path="/ramazancampaign" component={RamazanCampaign} />
      <Route exact path="/FeaturedNGOs" component={FeaturedNGOs} />
      <Route
        exact
        path="/DisasterReliefDonate"
        component={DisasterReliefDonate}
      ></Route>
      <Route
        exact
        path="/RamazanCampaignDonate/:id"
        component={RamazanCampaignDonate}
      />
      {/* <Route
        exact
        path="/FeaturedNGOsDonate/:id"
        component={FeaturedNGOsDonate}
      /> */}

      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)
//<Redirect to="/admin/dashboard" />
//<Route path="/admin" render={(props) => <AdminLayout {...props} />} />
