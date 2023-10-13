Game.preloader_INT_ML3_G7 = function (game) {
        this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_INT_ML3_G7.prototype = {
        preload: function () {

                this.load.video('ML3_1', window.baseUrl + 'assets/demoVideos/MLP-03-G7.mp4');   //* include demo video of ML-2 game.
                // this.load.video('ML3_2', 'demoVideos/ML3-G7_2.mp4');   //* include demo video of ML-2 game.

                this.load.atlas('bulb', window.baseUrl + 'assets/commonAssets/bulb.png', null, INT_ML3_G7_JSON.bulbBtnJson);
                this.load.image('skipArrow', window.baseUrl + 'assets/commonAssets/skipArrow.png');

                this.load.atlas('backbtn', window.baseUrl + 'assets/commonAssets/backbtn.png', null, INT_ML3_G7_JSON.backbtnJson);
                this.load.atlas('CommonSpeakerBtn', window.baseUrl + 'assets/commonAssets/speaker.png', null, INT_ML3_G7_JSON.speakerJson);
                this.load.atlas('starAnim', window.baseUrl + 'assets/commonAssets/starAnim.png', null, INT_ML3_G7_JSON.starAnimJson);
                this.load.atlas('replay', window.baseUrl + 'assets/commonAssets/reply.png', null, INT_ML3_G7_JSON.replyJson);

                this.load.image('navBar', window.baseUrl + 'assets/commonAssets/navBar.png');
                this.load.image('timebg', window.baseUrl + 'assets/commonAssets/timebg.png');
                this.load.image('hand', window.baseUrl + 'assets/commonAssets/hand.png');

                this.load.atlas('CommonHomeBtn', window.baseUrl + 'assets/commonAssets/homeBtn.png', null, INT_ML3_G7_JSON.homebtnJson);
                this.load.atlas('CommonNextBtn', window.baseUrl + 'assets/commonAssets/nextBtn.png', null, INT_ML3_G7_JSON.nextbtnJson);

                this.load.image('bg', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/Bg.png');

                this.load.image('blue box_1', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/blue box_1.png');
                this.load.image('blue box_2', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/blue box_2.png');

                this.load.image('fill box_1', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/fill box 1.png');
                this.load.image('fill box_2', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/fill box 2.png');
                this.load.image('fill box_3', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/fill box 3.png');

                this.load.atlas('eraser', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/eraser.png', null, INT_ML3_G7_JSON.eraser);
                this.load.atlas('minus', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/minus.png', null, INT_ML3_G7_JSON.minus);
                this.load.atlas('plus', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/pluse.png', null, INT_ML3_G7_JSON.plus);
                this.load.atlas('plusMinusA', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/pluse and minus aero.png', null, INT_ML3_G7_JSON.plusMinus);
                this.load.atlas('plusMinusS', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/pluse and minus.png', null, INT_ML3_G7_JSON.plusMinusS);


                // Orange text boxes
                this.load.atlas('Text box_1', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/text box_1.png', null, INT_ML3_G7_JSON.textBox);
                this.load.image('Text box_2', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/text box_2.png');
                this.load.image('Text box_3', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/text box_3.png');
                this.load.image('Highlight_Box', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/Highlight_Box.png');


                this.load.atlas('TickBtn', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/TickBtn.png', null, INT_ML3_G7_JSON.tickJson);

                this.load.atlas('Numberpad', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/Numberpad.png', null, INT_ML3_G7_JSON.numberPad)
                this.load.image('numpadbg', window.baseUrl + 'assets/gradeAssets/INT-ML3-G7/numbg.png');


        },

        create: function () {
                this.state.start('INT_ML3_G7level1');
        },
}