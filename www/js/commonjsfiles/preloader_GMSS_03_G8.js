Game.preloader_GMSS_03_G8 = function (game) {
  this.preloadBar = null;
};

var chime, clockTick;
Game.preloader_GMSS_03_G8.prototype = {
  preload: function () {
    //  this.load.video('nsrp02_1','demoVideos/AL-SUB-G7.mp4');   //* include demo video of game.
    this.load.image(
      "skipArrow",
      window.baseUrl + "assets/commonAssets/skipArrow.png"
    );

    this.load.atlas(
      "bulb",
      window.baseUrl + "assets/commonAssets/bulb.png",
      null,
      GMSS_03_G8_JSON.bulbBtnJson
    );

    this.load.atlas(
      "backbtn",
      window.baseUrl + "assets/commonAssets/backbtn.png",
      null,
      GMSS_03_G8_JSON.backbtnJson
    );
    this.load.atlas(
      "CommonSpeakerBtn",
      window.baseUrl + "assets/commonAssets/speaker.png",
      null,
      GMSS_03_G8_JSON.speakerJson
    );
    this.load.atlas(
      "starAnim",
      window.baseUrl + "assets/commonAssets/starAnim.png",
      null,
      GMSS_03_G8_JSON.starAnimJson
    );
    this.load.atlas(
      "replay",
      window.baseUrl + "assets/commonAssets/reply.png",
      null,
      GMSS_03_G8_JSON.replyJson
    );
    this.load.image(
      "navBar",
      window.baseUrl + "assets/commonAssets/navBar.png"
    );
    this.load.image(
      "timebg",
      window.baseUrl + "assets/commonAssets/timebg.png"
    );
    this.load.image("hand", window.baseUrl + "assets/commonAssets/hand.png");

    this.load.atlas(
      "CommonHomeBtn",
      window.baseUrl + "assets/commonAssets/homeBtn.png",
      null,
      GMSS_03_G8_JSON.homebtnJson
    );
    this.load.atlas(
      "CommonNextBtn",
      window.baseUrl + "assets/commonAssets/nextBtn.png",
      null,
      GMSS_03_G8_JSON.nextbtnJson
    );

    this.load.image(
      "BG1",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/bg.png"
    );

    //Boxes
    this.load.image(
      "Box_1",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/Box_1.png"
    );
    this.load.image(
      "Box_2",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/Box_2.png"
    ); //GMSS-03-G8window.baseUrl + \assets\gradeAssets\GMSS-03-G8\New folder
    //  this.load.atlas('Box_2', window.baseUrl + 'assets/gradeAssets/GMSS-03-G8/box.png', null, GMSS_03_G8_JSON.Bx2frame);
    this.load.atlas(
      "Box_2",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/Box_2new.png",
      null,
      GMSS_03_G8_JSON.box2New
    );

    this.load.image(
      "Box_3",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/Box_3.png"
    );
    this.load.image(
      "Box_4",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/Box_4.png"
    );
    this.load.atlas(
      "TickBtn",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/TickBtn.png",
      null,
      GMSS_03_G8_JSON.tickJson
    );
    // this.load.atlas('box 2', window.baseUrl + 'assets/gradeAssets/GMSS-03-G8/box 2.png', null, GMSS_03_G8_JSON.Box2);

    this.load.atlas(
      "Box2",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/box 2.png",
      null,
      GMSS_03_G8_JSON.Box2
    );
    this.load.image(
      "Box1",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/box11.png"
    );

    //Torch
    this.load.image(
      "txt1",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/text box_1.png"
    );
    this.load.image(
      "txt2",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/text box_2.png"
    );

    // Part A 3D objects here goes
    this.load.image(
      "VpinkTriangle",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _1.png"
    );
    this.load.image(
      "HpinkTriangle",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _2.png"
    );
    this.load.image(
      "Hprism",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _3.png"
    );
    this.load.image(
      "Vprism",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _4.png"
    );
    this.load.image(
      "Vcone",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _5.png"
    );
    this.load.image(
      "Hcone",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _6.png"
    );
    this.load.image(
      "cube",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _7.png"
    );
    this.load.image(
      "VblueTriangle",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _8.png"
    );
    this.load.image(
      "Vcylinder",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _9.png"
    );
    this.load.image(
      "Hcylinder",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _10.png"
    );
    this.load.image(
      "cuboid",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/3D shape _11.png"
    );

    //Part B shapes
    this.load.image(
      "obj1",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_1.png"
    );
    this.load.image(
      "obj2",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_2.png"
    );
    this.load.image(
      "obj3",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_3.png"
    );
    this.load.image(
      "obj4",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_4.png"
    );
    this.load.image(
      "obj5",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_5.png"
    );
    this.load.image(
      "obj6",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_6.png"
    );
    this.load.image(
      "obj7",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_7.png"
    );
    this.load.image(
      "obj8",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_8.png"
    );
    this.load.image(
      "obj9",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_9.png"
    );
    this.load.image(
      "obj10",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_10.png"
    );
    this.load.image(
      "obj11",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_11.png"
    );
    this.load.image(
      "obj12",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_12.png"
    );
    this.load.image(
      "obj13",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_13.png"
    );
    this.load.image(
      "obj14",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_14.png"
    );
    this.load.image(
      "obj15",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_15.png"
    );
    this.load.image(
      "obj16",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_16.png"
    );
    this.load.image(
      "obj17",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/object_17.png"
    );

    this.load.image(
      "numpadbg",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/numbg.png"
    );
    this.load.atlas(
      "Numberpad",
      window.baseUrl + "assets/gradeAssets/GMSS-03-G8/number pad.png",
      null,
      GMSS_03_G8_JSON.numberpadJson
    );
  },

  create: function () {
    this.state.start("GMSS_03_G8level1");
  },
};
