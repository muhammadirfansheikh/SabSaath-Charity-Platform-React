import React, { useEffect, useRef } from "react"
//import { Breadcrumb, BreadcrumbItem, Button, CardHeader, Col, Row } from "reactstrap";
import { Container } from "reactstrap"

import { Link } from "react-router-dom"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"


const TermsAndConditions = (props) => {
  const hash = window.location.hash
  const id = hash.replace("#", "")
  useEffect(() => {
    if (id) {
      if(document.getElementById(id)){
        document.getElementById(id).scrollIntoView() // scroll to the element
        document.getElementById(id).classList.add("highlight")
      }
     
    }
  }, [id])

  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h1 className="mb-0 ">Terms And Conditions</h1>
          </div>
        </section>
        <div class="row mainDiv">
          <Container>
            <p className="pt-3">
              <h1 className="mb-3 fw-600">1. Privacy Policy</h1>
              <h2>Policy Application: </h2>
              <p>This policy will be applicable to the following</p>
              <ol >
                <li> All the users of our website Sab Saath </li>
                <li>
                  {" "}
                  All the donors who want to donate through our website by using
                  their Debit and Credit Cards.
                </li>

                <li>
                  {" "}
                  All the applicants and beneficiaries who want to get funded
                  through our website Sab Saath{" "}
                </li>

                <li>
                  {" "}
                  All the organisations who want to donate through our website
                  or
                </li>

                <li>
                  {" "}
                  All the organisations who want to upload their cases on our
                  website.
                </li>
              </ol>

              <h2>Information we collect:</h2>
              <p>
                {" "}
                The type of information we collect and receive will vary
                depending upon if you are an individual or an organisation. We
                require certain basic information to give you an access to our
                portal. Normally we collect the following information:
              </p>

              <h3 class="heading">For Individuals</h3>
              <ol>
                <li>
                  Information you provide when you donate through our website
                  such as First Name, Last Name, Email ID, Contact #, Postal
                  Address, Country and Donation Amount etc.
                </li>
                <li>
                  Information you provide when you log on to our website such as
                  Name, Email ID, Phone #, Postal Address, City, and Country
                  etc.
                </li>
              </ol>
              <h3 class="heading">For NGOs</h3>
              <ol>
                <li>
                  Information you provide when you log on to our website such as
                  Name, Email ID, Phone #, Postal Address, City, and Country
                  etc.
                </li>
                <li>
                  Information you provide when you answer to online
                  questionnaires while registering at our website Sab Saath
                </li>
                <li>
                  Information you provide when you respond to declarations while
                  registering at our website Sab Saath
                </li>
                <li>
                  Documents you provide when registering for an online account
                  including business name, business email address, organization,
                  organization’s physical address, direct telephone number,
                  TIN/NTN, Registration / Founding Documents, Audited Accounts,
                  Financial Reports Etc.
                </li>
              </ol>
              <h2>Data Security & Access</h2>

              <p>
                We respect and protect your privacy. Sab Saath does not share
                data with any third party. However, we do not take
                responsibility or liability for any data breaches owing to cyber
                attacks or system malfunctioning.
              </p>
              <h3>How we use the information we collect / Data Handling:</h3>

              <p>
                The information we collect will only be used for any of the
                following situations when needed;
              </p>
              <ol >
                <li>
                  {" "}
                  It is necessary to perform our obligations or exercise our
                  duties as a registered NGO
                </li>

                <li>
                  {" "}
                  It is necessary to comply with applicable laws or regulations
                </li>

                <li>
                  {" "}
                  When required by any of the state institution(s), regulators,
                  agencies etc.
                </li>

                <li> For managing and promoting our projects and activities</li>

                <li>
                  {" "}
                  It is necessary to provide information in order to improve our
                  services
                </li>

                <li> To send notifications to your account </li>

                <li> Enabling you to access your account across devices</li>

                <li>
                  {" "}
                  For internal analysis and research to help us improve our
                  existing and create new projects & cases
                </li>
              </ol>

              <h2>Information Sharing:</h2>

              <p>
                We at Sab Saath do not sell, trade, or otherwise transfer to
                outside parties your personal information unless we provide you
                with advance notice. This does not include website hosting
                partners and other parties who assist us in operating our
                website, conducting our business, or servicing you, so long as
                those parties agree to keep this information confidential. We
                may also release your information when we believe release is
                appropriate to comply with the law, enforce our site policies,
                or protect our or others' rights, property, or safety. However,
                non-personally identifiable visitor information may be provided
                to other parties if required under any law & regulation.
              </p>

              <h2>Notification of Change in Policy</h2>

              <p>
                It is our policy to post any changes we make to our privacy
                policy on our website Sab Saath page with a notice that the
                privacy policy has been updated on the Website home page. If we
                make material changes to how we treat our users’ personal
                information, we will notify you by email to the email address
                that you have provided to us and/or through a notice on the
                Website home page. The date the privacy policy was last revised
                is identified at the top of the page. You are responsible for
                ensuring we have an up-to-date active and deliverable email
                address for you, and for periodically visiting our Website and
                this privacy policy to check for any changes. We will keep prior
                versions of this privacy policy in an archive for your review.
              </p>

              <p>
                <b>Disclaimer: </b>
                We at Sabsaath will not take the responsibility of any data
                losses, damage and any other loss or incident which occurs
                because of misuse of your personal / business information shared
                by you while using Sab Saath.
              </p>
              <b>Contact Information</b>

              <p>
                To ask questions or comment about this privacy policy, please
                contact us{" "}
                <a
                  href="https://sabsaath.org/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </p>

              <h1 className="fw-600">2. Terms of Agreement</h1>
              <p>
                This policy defines the “Terms of agreement” between you (the
                user/donor/beneficiary/applicant /organization) and Sabsaath.
                This agreement is essential to follow as it allows us to run our
                website successfully for the stakeholders. Please read the terms
                of agreement and refund policy carefully before you continue to
                browse or use the services provided to you on this Sabsaath
                platform.
              </p>
              <ol class="ml-3">
                <li>
                  This website/portal is offered to you on the conditional basis
                  that you comply with the terms & conditions, and notices
                  contained herein. Sabsaath may revise the Terms of Agreement
                  at any time without directly notifying the
                  users/donors/beneficiaries/applicants /organizations.
                </li>
                <li>
                  {" "}
                  By making a payment online, you are acknowledging and agreeing
                  with all the terms and conditions of Sabsaath.
                </li>
                <li>
                  {" "}
                  You acknowledged and agreed that Sabsaath has control over
                  your donated funds when a payment is executed successfully.
                </li>
                <li>
                  Sabsaath is a non-profit organization that only operates on
                  Sab Saath with the objectives to provide Clean Drinking Water
                  through Water Filtration Plants, Educational Scholarship,
                  Healthcare Support and Relief Assistance in order to achieve
                  its vision. Therefore, it is not responsible for any kind
                  risks or losses or damages as a result of incorrect
                  information posted / entered on its website.
                </li>
                <li>
                  You acknowledge that the information present on the Sabsaath
                  Website, if not stated otherwise, is original and retains
                  exclusive copyright. No material from this website may be
                  copied, modified, transmitted, posted, or distributed in any
                  form without receiving written or official permission from
                  this organization.
                </li>
                <li>
                  Its Sabaath Management sole discretion to accept or reject any
                  request for grant/ assistance/ emergency ect. Its decision
                  w.r.t to approval of any applicant request will be final and
                  neither questionable nor challengeable in any court of law.
                </li>
              </ol>
              <br></br>
              <h2 id="donor-account-activation">Donor Account Activation:</h2>
              <p>
                When you sign up, you will receive an email for activating
                account by setting up your password <br /> Through your donor
                account dashboard, you can
              </p>
              <ol class="ml-3">
                <li>view and manage your profile</li>
                <li>view your donation history</li>
                <li>view and manage your subscription</li>
              </ol>
              <h2
                id="subscription-policy"
                className="mt-1"
              >
                Case Subscription
              </h2>
              <h3>About subscription:</h3>
              <p>
                Whenever you subscribe to a case, Sab Saath generates your
                donation schedule i.e. dates for the next direct debit from your
                account based on your selected subscription option e.g. daily or
                monthly subscription.
              </p>
              <h3 id="Payment-Card-Security">Payment Card Security:</h3>
              <p>Sab Saath can not access or save your payment card info.</p>
              <p>
                In case of subscription, your card details are stored with our
                trusted third party service provider:{" "}
                <a
                  href="http://checkout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Checkout.com
                </a>
              </p>
              <p>
                <a
                  href="http://checkout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Checkout.com
                </a>{" "}
                is PCI DSS compliant (set of security standards designed to
                ensure that ALL companies that accept, process, store or
                transmit credit card information maintain a secure environment.)
              </p>
              <p>
                <a
                  href="http://checkout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Checkout.com
                </a>{" "}
                provides a unique card identifier to Sab Saath which we use to
                debit the donated amount from your account.
              </p>
              <h3>Currency Conversion:</h3>
              <p>
                In case of non-PKR based subscriptions, Sab Saath uses the
                conversion rate applicable for the date of the first
                transaction.
              </p>
              <p>
                The exchange rate for foreign currencies into PKR is sourced
                from fast
                <a
                  href="http://forex.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  forex.io
                </a>
              </p>
              <p>
                <b>Note:</b> Your bank may charge transaction fee for credit and
                debit card based transactions. Please contact your bank for
                questions pertaining to transaction fee.
              </p>
              <h3>Cancel Subscription Option:</h3>
              <p>
                Once you have access to your account, you can view and also
                cancel your future donations in a subscription (48 hours prior
                to donation date)
              </p>
              <p>
                In case you change your mind, you can always make a new donation
                or create a subscription again
              </p>
            </p>
          </Container>
        </div>
      </div>

      <HomeFooter />
    </div>
  )
}

export default TermsAndConditions
