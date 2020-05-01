import {AppSchema} from './app';
import {UserSchema} from './user';
import {DepositSchema} from './deposit';
import {GameSchema} from './game';
import {BetSchema} from './bet';
import {AdminSchema} from './admin';
import {EventSchema} from './event';
import {ResultSpaceSchema} from './resultSpace';
import {WithdrawSchema} from './withdraw';
import {BetResultSpaceSchema} from './betResultSpace';
import { WalletSchema } from './wallet';
import { SecuritySchema } from './security';
import { AffiliateStructureSchema } from './affiliateStructure';
import { ChatSchema } from './integrations/chat';
import { CustomizationSchema } from './customization';
import { TopBarSchema } from './customization/topBar';
import { BannersSchema } from './customization/banners';
import { LogoSchema }  from './customization/logo';
import { LogSchema }  from './log';
import { ColorSchema }  from './customization/color';
import { LinkSchema } from './customization/link';
import { FooterSchema } from './customization/footer';
import { TypographySchema } from './typography';
import { CurrencySchema } from './currency';
import { AddressSchema } from './address';
import { TopIconSchema } from './customization/topIcon'
import { TokenSchema } from './token';
import { MailSenderSchema } from './integrations/mailSender';
import { LoadingGifSchema } from "./customization/loadingGif";
import {AddOnSchema } from './addOn';
import { JackpotSchema } from './addOn/jackpot';
import { PermissionSchema } from "./permission";
import { AutoWithdrawSchema } from "./addOn/autoWithdraw";

export {
    CurrencySchema,
    UserSchema,
    LinkSchema,
    TopBarSchema,
    AddressSchema,
    FooterSchema,
    ColorSchema,
    BannersSchema,
    LogoSchema,
    LogSchema,
    CustomizationSchema,
    ChatSchema,
    AppSchema,
    WalletSchema,
    SecuritySchema,
    AffiliateStructureSchema,
    DepositSchema,
    GameSchema,
    BetSchema,
    BetResultSpaceSchema,
    EventSchema,
    WithdrawSchema,
    AdminSchema,
    ResultSpaceSchema,
    TypographySchema,
    TopIconSchema,
    TokenSchema,
    MailSenderSchema,
    LoadingGifSchema,
    AddOnSchema,
    JackpotSchema,
    PermissionSchema,
    AutoWithdrawSchema
}