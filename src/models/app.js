import { AppLogic } from '../logic';
import ModelComponent from './modelComponent';
import { AppRepository } from '../db/repos';
import Wallet from './wallet';
import { AffiliateSetup, Integrations, Customization, Typography, AddOn } from '.';
import {
    MapperAddCurrencyWalletSingleton,
    MapperAddGameSingleton,
    MapperEditBannersSingleton,
    MapperEditColorsSingleton,
    MapperEditFooterSingleton,
    MapperEditGameBackgroundImageSingleton,
    MapperEditGameEdgeSingleton,
    MapperEditGameImageSingleton,
    MapperEditGameTableLimitSingleton,
    MapperEditLoadingGifSingleton,
    MapperEditLogoSingleton,
    MapperEditMailSenderIntegrationSingleton,
    MapperEditTopBarSingleton,
    MapperEditTopIconSingleton,
    MapperEditTypographySingleton,
    MapperGetSingleton,
    MapperGetAuthSingleton,
    MapperGetGamesSingleton,
    MapperGetUsersSingleton,
    MapperRegisterSingleton,
    MapperSummarySingleton,
    MapperUpdateWalletSingleton,
    MapperAddAutoWithdrawSingleton,
    MapperEditAutoWithdrawSingleton
} from '../controllers/Mapper';

class App extends ModelComponent {

    constructor(params) {

        let db = new AppRepository();

        super(
            {
                name: 'App',
                logic: new AppLogic({ db: db }),
                db: db,
                self: null,
                params: params,
                children: [
                    new AffiliateSetup({
                        ...params,
                        structures: [
                            {
                                level: 1,
                                percentageOnLoss: 0.02
                            }
                        ]
                    }),
                    new Integrations(params),
                    new Customization(params),
                    new Typography(params),
                    new AddOn(params)
                ]
            }
        );
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */


    async register() {
        try {
            let app = await this.process('Register');
            /* If app is virtual - add virtual currency*/
            return MapperRegisterSingleton.output('Register', app);
        } catch (err) {
            throw err;
        }
    }

    /**
   * @param {String} 
   * @return {bool || Exception}  
   */


    async get() {
        try {
            let app = await this.process('Get');
            return MapperGetSingleton.output('Get', app._doc);
        } catch (err) {
            throw err;
        }
    }


    /**
   * @param {String} 
   * @return {bool || Exception}  
   */


    async getAuth() {
        try {
            let app = await this.process('Get');
            return MapperGetAuthSingleton.output('GetAuth', app._doc);
        } catch (err) {
            throw err;
        }
    }

    /**
      * @param {String} 
      * @return {bool || Exception}  
      */

    async summary() {
        try {
            let app = await this.process('Summary');
            // return MapperSummarySingleton.output('Summary', app);
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */

    async deployApp() {
        // Output = Boolean
        try {
            let app = await this.process('DeployApp');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async getGames() {
        try {
            let app = await this.process('GetGames');
            return MapperGetGamesSingleton.output('GetGames', app);
            // return app;
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async addServices() {
        // Output = Undefined
        try {
            let app = await this.process('AddServices');
            return app;
        } catch (err) {
            throw err;
        }
    }


    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async addGame() {
        try {
            let app = await this.process('AddGame');
            return MapperAddGameSingleton.output('AddGame', app);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async addJackpot() {
        try {
            let app = await this.process('AddJackpot');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async addAutoWithdraw() {
        try {
            let app = await this.process('AddAutoWithdraw');
            return MapperAddAutoWithdrawSingleton.output('AddAutoWithdraw', app._doc);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async editAutoWithdraw() {
        try {
            let app = await this.process('EditAutoWithdraw');
            return MapperEditAutoWithdrawSingleton.output('EditAutoWithdraw', app);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */
    async addCurrencyWallet() {
        try {
            let app = await this.process('AddCurrencyWallet');
            return MapperAddCurrencyWalletSingleton.output('AddCurrencyWallet', app);
        } catch (err) {
            throw err;
        }
    }


    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async getTransactions() {
        // No Output
        try {
            let app = await this.process('GetTransactions');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
   * @param {String} 
   * @return {bool || Exception}  
   */

    async getLastBets() {
        // Output = []
        try {
            let app = await this.process('GetLastBets');
            return app;
        } catch (err) {
            throw err;
        }
    }


    /**
   * @param {String} 
   * @return {bool || Exception}  
   */

    async getBiggestBetWinners() {
        // Output = []
        try {
            let app = await this.process('GetBiggestBetWinners');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
  * @param {String} 
  * @return {bool || Exception}  
  */

    async getBiggestUserWinners() {
        // Output = []
        try {
            let app = await this.process('GetBiggestUserWinners');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
  * @param {String}  
  * @return {bool || Exception}  
  */

    async getPopularNumbers() {
        // Output = []
        try {
            let app = await this.process('GetPopularNumbers');
            return app;
        } catch (err) {
            throw err;
        }
    }


    /**
    * @param {String} 
    * @return {bool || Exception}  
    */


    async editGameTableLimit() {
        try {
            let app = await this.process('EditGameTableLimit');
            return MapperEditGameTableLimitSingleton.output('EditGameTableLimit', app);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */


    async editGameEdge() {
        try {
            let app = await this.process('EditGameEdge');
            return MapperEditGameEdgeSingleton.output('EditGameEdge', app);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */


    async editGameImage() {
        try {
            let app = await this.process('EditGameImage');
            return MapperEditGameImageSingleton.output('EditGameImage', app);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */


    async editGameBackgroundImage() {
        try {
            let app = await this.process('EditGameBackgroundImage');
            return MapperEditGameBackgroundImageSingleton.output('EditGameBackgroundImage', app);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */


    async editAffiliateStructure() {
        // Output = Undefined
        try {
            let app = await this.process('EditAffiliateStructure');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
   * @param {String} 
   * @return {bool || Exception}  
   */


    async editIntegration() {
        // No Output
        try {
            let app = await this.process('EditIntegration');
            return app;
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */


    async editMailSenderIntegration() {
        try {
            let app = await this.process('EditMailSenderIntegration');
            return MapperEditMailSenderIntegrationSingleton.output('EditMailSenderIntegration', app);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */

    async editTopBar() {
        try {
            let app = await this.process('EditTopBar');
            return MapperEditTopBarSingleton.output('EditTopBar', app);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async editBanners() {
        try {
            let app = await this.process('EditBanners');
            return MapperEditBannersSingleton.output('EditBanners', app);
        } catch (err) {
            throw err;
        }
    }


    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async editLogo() {
        try {
            let app = await this.process('EditLogo');
            return MapperEditLogoSingleton.output('EditLogo', app);
        } catch (err) {
            throw err;
        }
    }


    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async editColors() {
        try {
            let app = await this.process('EditColors');
            return MapperEditColorsSingleton.output('EditColor', app);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */

    async editFooter() {
        try {
            let app = await this.process('EditFooter');
            return MapperEditFooterSingleton.output('EditFooter', app);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async editTopIcon() {
        try {
            let app = await this.process('EditTopIcon');
            return MapperEditTopIconSingleton.output('EditTopIcon', app);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */

    async editLoadingGif() {
        try {
            let app = await this.process('EditLoadingGif');
            return MapperEditLoadingGifSingleton.output('EditLoadingGif', app);
            // return app;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @param {String} 
     * @return {bool || Exception}  
     */

    async editTypography() {
        try {
            let app = await this.process('EditTypography');
            return MapperEditTypographySingleton.output('EditTypography', app);
        } catch (err) {
            throw err;
        }
    }

    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async getUsers() {
        try {
            let app = await this.process('GetUsers');
            return MapperGetUsersSingleton.output('GetUsers', app);
        } catch (err) {
            throw err;
        }
    }


    /**
    * @param {String} 
    * @return {bool || Exception}  
    */

    async updateWallet() {
        const { app } = this.self.params;
        try {
            let res = await this.process('UpdateWallet');
            return MapperUpdateWalletSingleton.output('UpdateWallet', res);
        } catch (err) {
            throw err;
        }
    }
}

export default App;
