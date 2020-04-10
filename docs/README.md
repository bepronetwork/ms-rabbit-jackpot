# BetProtocol API
## Version: 0.3.6

### /ecosystem/all

#### GET
##### Summary:

Register User Data

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /ecosystem/games/casino

#### GET
##### Summary:

Register User Data

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/admins/add

#### POST
##### Summary:

Register User Data

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [AddAdminRequest](#addadminrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admins/register

#### POST
##### Summary:

Register User Data

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [AdminRegisterRequest](#adminregisterrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admins/auth

#### POST
##### Summary:

Login User

##### Description:

Login Admin Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [AuthAdminRequest](#authadminrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admins/login

#### POST
##### Summary:

Login User

##### Description:

Login Admin Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [AdminLoginRequest](#adminloginrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admins/login/2fa

#### POST
##### Summary:

Login User

##### Description:

Login Admin Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [Admin2FALoginRequest](#admin2faloginrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admins/2fa/set

#### POST
##### Summary:

Setup 2fa

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | Admin object to submit to the network | Yes | [AdminSet2FARequest](#adminset2farequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /deposit/max/set

#### POST
##### Summary:

Set max deposit

##### Description:

Set max deposit Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| deposit | body | Set max deposit | Yes | [SetMaxDeposit](#setmaxdeposit) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/password/reset/ask

#### POST
##### Summary:

Reset Password

##### Description:

reset password

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [ResetPasswordRequest](#resetpasswordrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/password/reset/set

#### POST
##### Summary:

Reset Password Set

##### Description:

reset password set

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [setPasswordRequest](#setpasswordrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/register

#### POST
##### Summary:

Register User Data

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [UserRegisterRequest](#userregisterrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/auth

#### POST
##### Summary:

Login User

##### Description:

Login User Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [AuthUserRequest](#authuserrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/login

#### POST
##### Summary:

Login User

##### Description:

Login User Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [UserLoginRequest](#userloginrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/login/2fa

#### POST
##### Summary:

Login User

##### Description:

Login User Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [User2FALoginRequest](#user2faloginrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/2fa/set

#### POST
##### Summary:

Setup 2fa

##### Description:

Search for matching accounts in the system.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [UserSet2FARequest](#userset2farequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/bets

#### POST
##### Summary:

Get all Bets for the User

##### Description:

Get all Bets for the User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User Information | Yes | [UserBetsRequest](#userbetsrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/summary

#### POST
##### Summary:

Get Summary Data for User

##### Description:

Get Summary Data for User

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User Information | Yes | [UserSummaryRequest](#usersummaryrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/pusher/auth

#### POST
##### Summary:

Get Push Notifications Channel For user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User Information | Yes | [UserPusherNotificationsAuth](#userpushernotificationsauth) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /users/pusher/ping

#### POST
##### Summary:

Get Push Notifications Channel For user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User Information | Yes | [UserPusherNotificationsAuth](#userpushernotificationsauth) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/create

#### POST
##### Summary:

Create a App

##### Description:

Create a App for the user defined

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCreationRequest](#appcreationrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/summary

#### POST
##### Summary:

Get Summary Data for App

##### Description:

Get Summary Data for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppSummaryRequest](#appsummaryrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/wallet/currency/add

#### POST
##### Summary:

Add Currency Wallet

##### Description:

Add Currency Wallet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppAddCurrencyWallet](#appaddcurrencywallet) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/editTableLimit

#### POST
##### Summary:

Edit Table Limit

##### Description:

Change Table Limit

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppGameEditTableLimit](#appgameedittablelimit) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/affiliate/edit

#### POST
##### Summary:

Edit Table Limit

##### Description:

Change Table Limit

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppEditAffiliateStructure](#appeditaffiliatestructure) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/affiliate/custom/add

#### POST
##### Summary:

Creater Custom Affiliate 1st level

##### Description:

Change Table Limit

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppAffiliateCustomStructure](#appaffiliatecustomstructure) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/topBar

#### POST
##### Summary:

Edit Top Bar Customization

##### Description:

Change Table Limit

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationTopBar](#appcustomizationtopbar) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/banners

#### POST
##### Summary:

Edit Banner Information

##### Description:

Change Banners

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationBanners](#appcustomizationbanners) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/logo

#### POST
##### Summary:

Edit Banner Information

##### Description:

Change Logo

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationLogo](#appcustomizationlogo) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/colors

#### POST
##### Summary:

Edit Colors Information

##### Description:

Change Colors

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationColors](#appcustomizationcolors) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/footer

#### POST
##### Summary:

Edit Colors Information

##### Description:

Change Footer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationFooter](#appcustomizationfooter) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/topIcon

#### POST
##### Summary:

Add Top Icon

##### Description:

Add Some Icons

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationTopIcon](#appcustomizationtopicon) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/customization/loadingGif

#### POST
##### Summary:

Add Loading GIF

##### Description:

Add Some GIFs for loading page

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppCustomizationLoadingGif](#appcustomizationloadinggif) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/typography

#### POST
##### Summary:

Edit Typography Information

##### Description:

Change Typography

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppTypographyRequest](#apptypographyrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/address/get

#### POST
##### Summary:

Get Address Deposit for User

##### Description:

Change Footer

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppUserDepositAddressRequest](#appuserdepositaddressrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/deploy

#### POST
##### Summary:

Deploy App

##### Description:

Deploy Application

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppDeploy](#appdeploy) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/editEdge

#### POST
##### Summary:

Edit Table Limit

##### Description:

Change Table Limit

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppGameEditEdge](#appgameeditedge) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/editImage

#### POST
##### Summary:

Edit Game Image

##### Description:

Change Game Image

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppGameEditImage](#appgameeditimage) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/integrations/edit

#### POST
##### Summary:

Edit Integration

##### Description:

Change Integration Info

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppEditIntegration](#appeditintegration) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/integrations/mailSender/edit

#### POST
##### Summary:

Edit Mail Sender Integration

##### Description:

Change Mail Sender API Key and templates

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppEditMailSenderIntegration](#appeditmailsenderintegration) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/get/auth

#### POST
##### Summary:

Get Data for App

##### Description:

Get Summary Data for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppGetRequest](#appgetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/get

#### POST
##### Summary:

Get Data for App

##### Description:

Get Summary Data for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppGetRequest](#appgetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /admin/app/get

#### POST
##### Summary:

Get Data for Admin

##### Description:

Get Summary Data for Admin

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| admin | body | App Information | Yes | [AdminGetRequest](#admingetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/transactions

#### POST
##### Summary:

Get Summary Data for App

##### Description:

Get Summary Data for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppTransactionsRequest](#apptransactionsrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/user/get

#### POST
##### Summary:

Get all User Info

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Game Information | Yes | [UserInfoGetRequest](#userinfogetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/users

#### POST
##### Summary:

Get App Users

##### Description:

Get All App Users

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | User object to submit to the network | Yes | [AppUsersRequest](#appusersrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/services/add

#### POST
##### Summary:

Add Services to Company

##### Description:

Add Services to Company

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppServicesRequest](#appservicesrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/webhookBitgoDeposit

#### POST
##### Summary:

Update Wallet Amount for the App

##### Description:

Update Wallet Amount for the App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/lastBets

#### POST
##### Summary:

Get Lasts Bets for App

##### Description:

Get Lasts Bets for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppLastBetsRequest](#applastbetsrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/biggestBetWinners

#### POST
##### Summary:

Get Lasts Bets for App

##### Description:

Get Lasts Bets for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppBiggestWinnersRequest](#appbiggestwinnersrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/biggestUserWinners

#### POST
##### Summary:

Get Lasts Bets for App

##### Description:

Get Lasts Bets for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppBiggestWinnersRequest](#appbiggestwinnersrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/popularNumbers

#### POST
##### Summary:

Get Lasts Bets for App

##### Description:

Get Lasts Bets for App

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppPopularNumbersRequest](#apppopularnumbersrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/add

#### POST
##### Summary:

Edit Table Limit

##### Description:

Change Table Limit

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| app | body | App Information | Yes | [AppAddGameRequest](#appaddgamerequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/getAll

#### POST
##### Summary:

Get all Games for the App defined

##### Description:

Get all Games for the App defined

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| game | body | Game Information | Yes | [GetGamesFromAppRequest](#getgamesfromapprequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/bet/place

#### POST
##### Summary:

Place a Bet

##### Description:

Place a Bet for User Selected

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Bet Information | Yes | [PlaceBetRequest](#placebetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/bet/max

#### POST
##### Summary:

Set Max of a Bet

##### Description:

Set a Max Value for a Bet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Bet Information | Yes | [MaxBetRequest](#maxbetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /app/games/get

#### POST
##### Summary:

Get a game

##### Description:

Get a Game Data

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bet | body | Game Information | Yes | [GameGetRequest](#gamegetrequest) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /ping/post

#### POST
##### Summary:

Test Ping

##### Description:

Test Ping for post.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| ping | body | Ping Object for test | Yes | [PingPost](#pingpost) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [GeneralResponse](#generalresponse) |
| default | Error | [ErrorResponse](#errorresponse) |

### /swagger

### Models


#### SetMaxDeposit

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | ID app  | Yes |
| wallet_id | string (name) | Unique identifier of the wallet  | Yes |
| amount | number (number) | Max value for deposit  | Yes |

#### AdminRegisterRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID  | Yes |
| name | string | User Real Name  | Yes |
| email | string | User Email  | Yes |
| password | string | Password Hashed  | Yes |

#### setPasswordRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | string (string) | token  | Yes |
| password | string (string) | password  | Yes |
| user_id | string (string) | user id  | Yes |

#### ResetPasswordRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username_or_email | string (string) | username or email  | Yes |

#### UserRegisterRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID  | Yes |
| name | string (name) | User Real Name  | Yes |
| email | string (email) | User Email  | Yes |
| affiliateLink | string |  | No |
| app | string | App Id  | Yes |

#### UserInfoGetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user | string | Unique identifier of the user, ID  | Yes |
| app | string | Unique identifier of the user, ID  | Yes |

#### AdminLoginRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID  | Yes |
| password | password | User Password Encrypted  | Yes |

#### AdminSet2FARequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| admin | string | Admin Id  | Yes |
| 2fa_token | string | Token Prior to the set of 2FA  | Yes |
| 2fa_secret | string | Secret Token 2FA  | Yes |

#### Admin2FALoginRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| 2fa_token | string (username) | Token to Unlock Login Data  | Yes |

#### UserLoginRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| username | string (username) | Unique identifier of the user, besides the ID  | Yes |
| password | password | User Password Encrypted  | Yes |
| app | string | Unique identifier of the App Id  | Yes |

#### UserSet2FARequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user | string | User Id  | Yes |
| 2fa_token | string | Token Prior to the set of 2FA  | Yes |
| 2fa_secret | string | Secret Token 2FA  | Yes |

#### User2FALoginRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| 2fa_token | string (username) | Token to Unlock Login Data  | Yes |

#### UserSummaryRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| type | string (name) | Type of Summary Data  | Yes |
| user | string (name) | User ID  | Yes |
| periodicity | string (name) | Periodicity of Data  | No |
| currency | string (name) | Currency ID  | Yes |

#### UserPusherNotificationsAuth

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| socket_id | string (name) |  | No |
| channel_name | string (name) |  | No |
| user | string (name) |  | No |

#### AppGameEditEdge

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| game | string (name) | Game id  | Yes |
| edge | number | New Edge  | Yes |

#### AppGameEditImage

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| game | string (name) | Game id  | Yes |
| image_url | string | image blob or link | Yes |

#### AppAddCurrencyWallet

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| currency_id | string (name) | Currency id  | Yes |
| passphrase | string | Passphrase to protect the wallet  | Yes |

#### AppGameEditTableLimit

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| game | string (name) | Game id  | Yes |
| tableLimit | number | New Table Limit  | Yes |

#### AppCustomizationBanners

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| banners | [ string ] |  | Yes |
| autoDisplay | boolean |  | Yes |

#### AppCustomizationColors

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| colors | [ object ] |  | Yes |

#### AppCustomizationLogo

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| logo | string | image blob or link | Yes |

#### AppCustomizationFooter

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| supportLinks | [ object ] |  | Yes |
| communityLinks | [ object ] |  | Yes |

#### AppCustomizationTopBar

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| backgroundColor | string (name) |  | Yes |
| textColor | string (name) |  | Yes |
| text | string (name) |  | Yes |
| isActive | boolean |  | Yes |

#### AppCustomizationTopIcon

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| topIcon | string | image blob or link | Yes |

#### AppCustomizationLoadingGif

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| loadingGif | string | image blob or link | Yes |

#### AppTypographyRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| typography | [ object ] |  | Yes |

#### AppDeploy

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |

#### AppEditIntegration

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| publicKey | string (name) |  | Yes |
| privateKey | string (name) |  | Yes |
| integration_type | string (name) |  | Yes |
| integration_id | string (name) |  | Yes |
| isActive | boolean |  | Yes |

#### AppEditMailSenderIntegration

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| apiKey | string (name) |  | Yes |
| templateIds | [ object ] |  | Yes |

#### AppEditAffiliateStructure

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| structures | [ object ] |  | Yes |
| affiliateTotalCut | number | Total Affiliate Cut (0-1)  | Yes |

#### AppAffiliateCustomStructure

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string | App id  | Yes |
| user | string | User id  | Yes |
| affiliatePercentage | number | Total Affiliate Cut (0-1)  | Yes |

#### AppGetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |

#### AdminGetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App id  | Yes |
| admin | string (name) | Admin id  | Yes |

#### AppCreationRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string (name) | App Name  | Yes |
| description | string (description) | App Description  | Yes |
| marketType | integer | Market Mapping Number  | Yes |
| metadataJSON | string | Metadata JSON Object  | Yes |
| admin_id | string | Admin Id  | Yes |

#### GameGetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | string (name) | Game Id  | Yes |

#### AppTransactionsRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| filters | [ object ] |  | Yes |

#### AppPopularNumbersRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| size | number | size  | No |

#### AppLastBetsRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| size | number | size  | Yes |

#### AppUserDepositAddressRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| currency | string (name) | Currency ID  | Yes |
| id | string (name) | User ID  | Yes |

#### AppBiggestWinnersRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| size | number | size  | Yes |

#### AppUsersRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| size | number |  | No |
| user | string (name) | User Id  | No |
| offset | number |  | No |

#### UserBetsRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| size | number | Amount of Bets Wanted  | Yes |
| user | string (name) | User ID  | Yes |
| periodicity | string (name) | Periodicity of Data  | No |
| currency | string (name) | Currency ID  | Yes |

#### AppSummaryRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| type | string (name) | App Name  | Yes |
| app | string (name) | App ID  | Yes |
| periodicity | string (name) | Periodicity of Data  | No |
| currency | string (name) | Currency ID  | Yes |

#### AppAddGameRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| game | string (name) | Game ID  | Yes |

#### AppServicesRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (name) | App ID  | Yes |
| services | [ integer ] | Services ID  | Yes |

#### AuthAdminRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| admin | string | Admin Id  | Yes |

#### AuthUserRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user | string | User Id  | Yes |

#### GetGamesFromAppRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string | App Id  | Yes |

#### PlaceBetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| user | string (string) | User Id  | Yes |
| app | string (string) | App Id  | Yes |
| game | string (string) | Game Id  | Yes |
| currency | string (string) | Currency Id  | Yes |
| nonce | number | Nonce  | Yes |
| result | [ object ] |  | Yes |

#### AddAdminRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string (string) | Email for admin  | Yes |
| app | string (string) | App Id  | Yes |
| admin | string (string) | Admin Current Id  | Yes |

#### MaxBetRequest

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| app | string (string) | App Id  | Yes |
| game | string (string) | Game Id  | Yes |
| maxBet | number (number) | Bet Max Value  | Yes |

#### GeneralResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object (data) | Unique identifier of the user, besides the ID  | Yes |
| meta | object (meta) | User Real Name  | Yes |

#### ErrorResponse

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| message | string |  | Yes |

#### PingPost

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| type | string | Type Auth  | Yes |