import chai from 'chai';

import { mochaAsync, detectValidationErrors, detectEqualFieldValueOccurences } from '../../../utils';
import { editAppStructure, getApp } from '../../../services';

const expect = chai.expect;


context('Edit Structures', async () => {

    var app;
    var admin;

    before( async () =>  {
        app = global.test.app;
        admin = global.test.admin;
    });

    it('it should throw error on empty structure', mochaAsync(async () => {
        const structures = []
        let res = await editAppStructure({app, admin, structures});
        detectValidationErrors(res);
        const { status } = res.data;
        expect(status).to.equal(42);
    }));

    it('it should throw error on structure without percentageOnLoss', mochaAsync(async () => {
        const structures = [{level : 1}]
        let res = await editAppStructure({app, admin, structures});
        const { message } = res;
        expect(message).to.equal('Validation errors');
    }));

    it('it should throw error on structure without level', mochaAsync(async () => {
        const structures = [{percentageOnLoss : 0.04}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(42);
    }));

    it('it should throw error on structure with same level', mochaAsync(async () => {
        const structures = [{level : 1, percentageOnLoss : 0.04}, {level : 2, percentageOnLoss : 0.03}, {level : 3, percentageOnLoss : 0.02}, {level : 3, percentageOnLoss : 0.01}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(42);
    }));

    it('it should throw error on structure with level negative', mochaAsync(async () => {
        const structures = [{level : -1, percentageOnLoss : 0.04}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(42);
    }));


    it('it should throw error on structure with percentageOnLoss Negative', mochaAsync(async () => {
        const structures = [{level : 1, percentageOnLoss : -0.04}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(42);
    }));

    it('it should throw error on structure with level 0', mochaAsync(async () => {
        const structures = [{level : 0, percentageOnLoss : 0.04}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(42);
    }));

    it('it should throw error on structure with percentageOnLoss 0', mochaAsync(async () => {
        const structures = [{level : 1, percentageOnLoss : 0}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(42);
    }));

    it('it should allow app to add structures and keep the old ones ids', mochaAsync(async () => {
        let app_data_before = await getApp({app, admin});
        const { message : data_before } = app_data_before.data;

        const structures = [{level : 1, percentageOnLoss : 0.03}, {level : 2, percentageOnLoss : 0.02}, {level : 3, percentageOnLoss : 0.01}, {level : 4, percentageOnLoss : 0.01}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(200);

        let app_data_after = await getApp({app, admin});
        const { message : data_after } = app_data_after.data;
        /* Test if they are 4 */
        expect(data_after.affiliateSetup.affiliateStructures.length).to.equal(structures.length);
        
        /* Test if the pre-existing structures kept intacted */
        const known_similar_structures = detectEqualFieldValueOccurences(structures, data_before.affiliateSetup.affiliateStructures, 'level');
        const post_change_similar_structures = detectEqualFieldValueOccurences(data_after.affiliateSetup.affiliateStructures, data_before.affiliateSetup.affiliateStructures, 'level');

        expect(known_similar_structures).to.equal(post_change_similar_structures);
        for( var i = 0; i < data_after.affiliateSetup.affiliateStructures.length; i++){
            const structure = data_after.affiliateSetup.affiliateStructures[i];
            /* Test if there is only one of each per level [1,2,3,4] */
            const structure_post = structures.find( s => s.level == structure.level);
            expect(structure.level).to.be.equal(structure_post.level);
        
            /* Test if ID keep the same for previous ones */
            const before_structure = data_before.affiliateSetup.affiliateStructures.find( a => a.level == structure.level);
            if(before_structure){
                expect(before_structure._id).to.be.equal(structure._id);
            }

            /* Test if Percentage on Loss is right */
            expect(structure.percentageOnLoss).to.equal(structure_post.percentageOnLoss);
            /* Test if is Active */
            expect(structure.isActive).to.equal(true);
        }

    }));

    it('it should allow app to change structures keeping the old users info ids', mochaAsync(async () => {
        let app_data_before = await getApp({app, admin});
        const { message : data_before } = app_data_before.data;

        const structures = [{level : 1, percentageOnLoss : 0.06}, {level : 2, percentageOnLoss : 0.04}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(200);

        let app_data_after = await getApp({app, admin});
        const { message : data_after } = app_data_after.data;
        /* Test if they are 4 */
        expect(data_after.affiliateSetup.affiliateStructures.length).to.equal(data_before.affiliateSetup.affiliateStructures.length);
        
        /* Test if the pre-existing structures kept intacted */
        const known_similar_structures = detectEqualFieldValueOccurences(structures, data_before.affiliateSetup.affiliateStructures, 'level');
        const post_change_similar_structures = detectEqualFieldValueOccurences(data_after.affiliateSetup.affiliateStructures, data_before.affiliateSetup.affiliateStructures, 'level');

        expect(known_similar_structures).to.equal(post_change_similar_structures);

        for( var i = 0; i < data_after.affiliateSetup.affiliateStructures.length; i++){
            const structure = data_after.affiliateSetup.affiliateStructures[i];
            /* Test if there is only one of each per level [1,2,3,4] */
            const structure_requested = structures.find( s => s.level == structure.level);
            const before_structure = data_before.affiliateSetup.affiliateStructures.find( a => a.level == structure.level);

            if(structure_requested){
                expect(before_structure._id).to.be.equal(structure._id);
                /* Test if All current info has changed */
                expect(structure.level).to.be.equal(structure_requested.level);
                /* Test if Percentage on Loss is right */
                expect(structure.percentageOnLoss).to.equal(structure_requested.percentageOnLoss);
                /* Test if is Active */
                expect(structure.isActive).to.equal(true);
            }else{
                /* Test if All previous info is the same */
                expect(before_structure.level).to.be.equal(structure.level);
                /* Test if Id is equal*/
                expect(before_structure._id).to.be.equal(structure._id);
                /* Test if Percentage on Loss is right */
                expect(before_structure.percentageOnLoss).to.be.equal(structure.percentageOnLoss);
                /* Test if is Active is false */
                expect(structure.isActive).to.equal(false);

            }
        }
    }));


    it('it should allow app to keep structures with same variables', mochaAsync(async () => {
        /* Get Before Data */
        let app_data_before = await getApp({app, admin});
        const { message : data_before } = app_data_before.data;

        const structures = [{level : 1, percentageOnLoss : 0.06}, {level : 2, percentageOnLoss : 0.04}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(200);

        let app_data_after = await getApp({app, admin});
        const { message : data_after } = app_data_after.data;
        /* Test if they are 4 */
        expect(data_after.affiliateSetup.affiliateStructures.length).to.equal(data_before.affiliateSetup.affiliateStructures.length);
        
        /* Test if the pre-existing structures kept intacted */
        const known_similar_structures = detectEqualFieldValueOccurences(structures, data_before.affiliateSetup.affiliateStructures, 'level');
        const post_change_similar_structures = detectEqualFieldValueOccurences(data_after.affiliateSetup.affiliateStructures, data_before.affiliateSetup.affiliateStructures, 'level');

        expect(known_similar_structures).to.equal(post_change_similar_structures);
        for( var i = 0; i < data_after.affiliateSetup.affiliateStructures.length; i++){
            const structure = data_after.affiliateSetup.affiliateStructures[i];
            const before_structure = data_before.affiliateSetup.affiliateStructures.find( a => a.level == structure.level);
            const structure_post = structures.find( s => s.level == structure.level);
            if(structure_post){
                /* Test if there is only one of each per level [1,2,3,4] */
                expect(structure.level).to.be.equal(structure_post.level);
                /* Test if ID keep the same for previous ones */
                expect(structure._id).to.be.equal(before_structure._id);
                /* Test if Percentage on Loss is right */
                expect(structure.percentageOnLoss).to.equal(structure_post.percentageOnLoss);
                /* Test if is Active */
                expect(structure.isActive).to.equal(true);
            }else{
                /* Test if there is only one of each per level [1,2,3,4] */
                expect(before_structure.level).to.be.equal(structure.level);
                /* Test if ID keep the same for previous ones */
                expect(before_structure._id).to.be.equal(structure._id);
                /* Test if Percentage on Loss is right */
                expect(before_structure.percentageOnLoss).to.equal(structure.percentageOnLoss);
                /* Test if is Active */
                expect(structure.isActive).to.equal(false);
            }
        }
    }));



    it('it should allow app to keep structures with different variables', mochaAsync(async () => {
        /* Get Before Data */
        let app_data_before = await getApp({app, admin});
        const { message : data_before } = app_data_before.data;

        const structures = [{level : 1, percentageOnLoss : 0.03}, {level : 2, percentageOnLoss : 0.02}]
        let res = await editAppStructure({app, admin, structures});
        const { status } = res.data;
        expect(status).to.equal(200);

        let app_data_after = await getApp({app, admin});
        const { message : data_after } = app_data_after.data;
        /* Test if they are 4 */
        expect(data_after.affiliateSetup.affiliateStructures.length).to.equal(data_before.affiliateSetup.affiliateStructures.length);
        
        /* Test if the pre-existing structures kept intacted */
        const known_similar_structures = detectEqualFieldValueOccurences(structures, data_before.affiliateSetup.affiliateStructures, 'level');
        const post_change_similar_structures = detectEqualFieldValueOccurences(data_after.affiliateSetup.affiliateStructures, data_before.affiliateSetup.affiliateStructures, 'level');

        expect(known_similar_structures).to.equal(post_change_similar_structures);
        for( var i = 0; i < data_after.affiliateSetup.affiliateStructures.length; i++){
            const structure = data_after.affiliateSetup.affiliateStructures[i];
            const before_structure = data_before.affiliateSetup.affiliateStructures.find( a => a.level == structure.level);
            const structure_post = structures.find( s => s.level == structure.level);
            if(structure_post){
                /* Test if there is only one of each per level [1,2,3,4] */
                expect(structure.level).to.be.equal(structure_post.level);
                /* Test if ID keep the same for previous ones */
                expect(structure._id).to.be.equal(before_structure._id);
                /* Test if Percentage on Loss is right */
                expect(structure.percentageOnLoss).to.equal(structure_post.percentageOnLoss);
                /* Test if is Active */
                expect(structure.isActive).to.equal(true);
            }else{
                /* Test if there is only one of each per level [1,2,3,4] */
                expect(before_structure.level).to.be.equal(structure.level);
                /* Test if ID keep the same for previous ones */
                expect(before_structure._id).to.be.equal(structure._id);
                /* Test if Percentage on Loss is right */
                expect(before_structure.percentageOnLoss).to.equal(structure.percentageOnLoss);
                /* Test if is Active */
                expect(structure.isActive).to.equal(false);
            }
        }
    }));
});
