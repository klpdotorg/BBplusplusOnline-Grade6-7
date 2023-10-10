Game.NSF_DFW_G7level1 = function () { };


Game.NSF_DFW_G7level1.prototype =
{
    init: function (param, score) {
        _this = this;

        this.Stararr = param;
        this.score = score;
        _this = this;
        // _this.languageSelected = document.getElementById("LANGUAGE").innerHTML;
        _this.languageSelected = window.languageSelected;
        if (_this.languageSelected == null
            || _this.languageSelected == " "
            || _this.languageSelected == "") {
            _this.languageSelected = "English";
        }
        else console.log("Language selected: " + _this.languageSelected);
        _this.clickSound = document.createElement('audio');
        _this.clickSoundsrc = document.createElement('source');
        _this.clickSoundsrc.setAttribute("src", window.baseUrl + "sounds/ClickSound.mp3");
        _this.clickSound.appendChild(_this.clickSoundsrc);

        _this.successSound = document.createElement('audio');
        _this.successSoundsrc = document.createElement('source');
        _this.successSoundsrc.setAttribute("src", window.baseUrl + "sounds/Success.mp3");
        _this.successSound.appendChild(_this.successSoundsrc);

        _this.celebrationSound = document.createElement('audio');
        _this.celebrationSoundsrc = document.createElement('source');
        _this.celebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/celebration.mp3");
        _this.celebrationSound.appendChild(_this.celebrationSoundsrc);

        _this.counterCelebrationSound = document.createElement('audio');
        _this.counterCelebrationSoundsrc = document.createElement('source');
        _this.counterCelebrationSoundsrc.setAttribute("src", window.baseUrl + "sounds/counter_celebration.mp3");
        _this.counterCelebrationSound.appendChild(_this.counterCelebrationSoundsrc);

        _this.wrongans = document.createElement('audio');
        _this.wronganssrc = document.createElement('source');
        _this.wronganssrc.setAttribute("src", window.baseUrl + "sounds/WrongCelebrationSound.mp3");
        _this.wrongans.appendChild(_this.wronganssrc);

        _this.framechange = document.createElement('audio');
        _this.framechangesrc = document.createElement('source');
        _this.framechangesrc.setAttribute("src", window.baseUrl + "sounds/Frame_change_sound.mp3");
        _this.framechange.appendChild(_this.framechangesrc);

        _this.snapSound = document.createElement('audio');
        _this.snapSoundsrc = document.createElement('source');
        _this.snapSoundsrc.setAttribute("src", window.baseUrl + "sounds/snapSound.mp3");
        _this.snapSound.appendChild(_this.snapSoundsrc);

        _this.Ask_Question1 = _this.createAudio("NSF_DIV_01_G7_a1");
        _this.Ask_Question2 = _this.createAudio("NSF_DIV_01_G7_a2");
        //_this.Ask_Question3 = _this.createAudio("V3");

        //edited for baseurl apk
        telInitializer.gameIdInit("NSF_DFW_G7", gradeSelected);// first Tele call
        console.log(gameID, "gameID...");


    },

    create: function (game) {

        _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        _this.hintBtn.scale.setTo(0.5, 0.6);
        _this.hintBtn.visible = false;
        //* show the demo video
        _this.time.events.add(1, function () {

            _this.ViewDemoVideo();
        });

        //* start the game with delay. Since the Demo video will pause the game, the timer will freeze
        //* and then start after the game is unpaused and continues to call the gameCreate function.
        _this.time.events.add(1500, function () {
            console.log("//////////////////")
            _this.gameCreate(game);
        });
    },

    ViewDemoVideo: function () {
        //* pause the game before going to the demovideo 
        _this.game.paused = true;
        _this.DemoVideo();  //* at the end of demo video/skip pressed, it will unpause the game.
    },

    gameCreate: function (game) {
        //edited for baseurl apk
        //*add these  variables
        _this.noofAttempts = 0;//total attempt to answer q question
        _this.AnsTimerCount = 0;//total time
        _this.sceneCount = 0;//no of screen
        _this.questionid = null;//always 1
        //............
        _this.hint_flag = 0;// * hint flag zero
        // _this.AnsTimerCount = 0;
        _this.count1 = 0;
        _this.speakerbtn;
        _this.background;
        _this.starsGroup;

        _this.seconds = 0;
        _this.minutes = 0;
        _this.selectedAns1 = ''
        _this.selectedAns2 = ''
        _this.selectedAns3 = ''
        _this.reverseDemoShown = false;

        _this.part1 = false;
        _this.part2 = false;
        _this.part3 = false;
        _this.part4 = false;
        _this.finalAns = false;
        _this.signNotselected = false;

        _this.counterForTimer = 0;

        _this.speakerbtnClicked = false;
        _this.rightbtn_Clicked = false;

        _this.Question_flag = -1;
        valuesCombinations = []

        _this.background = _this.add.tileSprite(0, 0, _this.world.width, _this.world.height, 'bg');
        //** include the background file, navigation bar, stars, timer objects.

        _this.navBar = _this.add.sprite(0, 0, 'navBar');

        _this.backbtn = _this.add.sprite(5, 6, 'backbtn');
        _this.backbtn.inputEnabled = true;
        _this.backbtn.input.useHandCursor = true;
        _this.backbtn.events.onInputDown.add(function () {
            // _this.state.start('score');
            // _this.stopVoice();
            _this.time.events.removeAll();
            _this.backbtn.events.onInputDown.removeAll();
            _this.time.events.add(50, function () {
                _this.state.start('grade7NumberSystems', true, false);
            });
        });

        _this.speakerbtn = _this.add.sprite(600, 6, 'CommonSpeakerBtn');

        _this.speakerbtn.events.onInputDown.add(function () {
            telInitializer.tele_interactEvent("TOUCH", "speaker");
            if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
                _this.speakerbtn.inputEnabled = false;
                _this.speakerbtn.input.useHandCursor = false;
                _this.clickSound.play();

                if (_this.Question_flag == 1) {
                    _this.Ask_Question1.play();
                }
                if (_this.Question_flag == 2) {
                    _this.Ask_Question2.play();
                }
                // if (_this.Question_flag == 3) {
                //     _this.Ask_Question3.play();
                // }

                _this.time.events.add(3000, function () {
                    _this.speakerbtnClicked = false;
                    _this.EnableVoice();
                });
            }

        }, _this);

        _this.timebg = _this.add.sprite(305, 6, 'timebg');
        _this.timeDisplay = _this.add.text(330, 22, _this.minutes + ' : ' + _this.seconds);
        _this.timeDisplay.anchor.setTo(0.5);
        _this.timeDisplay.align = 'center';
        _this.timeDisplay.font = 'Oh Whale';
        _this.timeDisplay.fontSize = 20;
        _this.timeDisplay.fill = '#ADFF2F';

        _this.numGroup;
        _this.grid = [];
        _this.greenBoxArr = [];
        _this.orangeBoxArr = []

        // BULB
        // _this.hintBtn = _this.add.sprite(670, 6, 'bulb');
        // _this.hintBtn.scale.setTo(0.5, 0.6);
        _this.hintBtn.bringToTop();
        _this.hintBtn.visible = true;
        _this.hintBtn.smoothed = false;
        _this.hintBtnAnim = _this.hintBtn.animations.add('hint');
        _this.hintBtnAnim.play(15);
        _this.hintBtnAnim.onComplete.add(function () {
            _this.hintBtnAnim.play(15);
        }, _this);
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;

        _this.hintBtn.events.onInputDown.add(function () {
            console.log("inside hintbutton function");
            _this.hintBtn.inputEnabled = false;
            _this.hintBtn.input.useHandCursor = false;
            //* show the demo video
            _this.time.events.add(1, function () {
                _this.ViewDemoVideo();
            });

        });

        _this.generateStarsForTheScene(6);

        //* start the game with first question
        _this.time.events.add(1000, _this.getQuestion);
    },


    createAudio: function (src) {
        audio = document.createElement('audio');
        audiosrc = document.createElement('source');
        audiosrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/" + src + ".mp3");
        audio.appendChild(audiosrc);

        return audio;
    },

    //* function to enable the speaker button once pressed.
    EnableVoice: function () {
        if (_this.speakerbtnClicked == false && _this.rightbtn_Clicked == false) {
            _this.speakerbtn.inputEnabled = true;
            _this.speakerbtn.input.useHandCursor = true;
            _this.speakerbtnClicked = false;
        }
    },

    updateTimer: function () {
        _this.counterForTimer++;
        if (_this.counterForTimer > 59) {
            _this.counterForTimer = 0;

            if (_this.minutes < 10) {
                _this.minutes = _this.minutes + 1;
                _this.seconds = 00;
            }
            else {
                _this.minutes = _this.minutes + 1;
            }
        }
        else {
            if (_this.counterForTimer < 10)
                _this.seconds = '0' + _this.counterForTimer;
            else
                _this.seconds = _this.counterForTimer;
        }
        _this.timeDisplay.setText(_this.minutes + ':' + _this.seconds);
    },
    getQuestion: function (target) {
        if (_this.timer) {
            _this.timer.stop();
            _this.timer = null;
        }
        _this.timer = _this.time.create(false);

        //  Set a TimerEvent to occur after 2 seconds
        _this.timer.loop(1000, function () {
            _this.hintBtn.inputEnabled = true;
            _this.hintBtn.input.useHandCursor = true;
            _this.AnsTimerCount++;
        }, _this);

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        _this.timer.start();

        /*******************For Navigation Bar*********************/
        _this.timer1 = _this.time.create(false);

        _this.timer1.loop(1000, function () {
            _this.updateTimer();
        }, _this);

        _this.timer1.start();

        /************************$$$$$$$$$$**********************/

        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.

        _this.speakerbtn.inputEnabled = true;
        _this.speakerbtn.input.useHandCursor = true;


        // Stores Random Question values in Array
        _this.StoreArrayValues();
        // _this.showInitialScreen()
        _this.MakeSideBar();

        //* hintbtn will be true when the game is playing
        _this.hintBtn.inputEnabled = true;
        _this.hintBtn.input.useHandCursor = true;
        _this.hint_flag = 1;

        //edited for baseurl apk
        _this.questionid = 1;

    },
    stopVoice: function () {
        _this.Ask_Question1.pause();
        _this.Ask_Question1 = null;

        _this.Ask_Question2.pause();
        _this.Ask_Question2 = null;

        // _this.Ask_Question3.pause();
        // _this.Ask_Question3 = null;


        if (_this.celebrationSound) {
            if (_this.celebrationSound.isPlaying) {
                _this.celebrationSound.stop();
                _this.celebrationSound = null;
            }
        }
    },

    generateStarsForTheScene: function (count) {
        _this.starsGroup = _this.add.group();
        for (var i = 0; i < count; i++) {
            _this.starsGroup.create(_this.world.centerX - 15, 10, 'starAnim');
            for (var j = 0; j < i; j++) {
                if (_this.starsGroup.getChildAt(j)) {
                    _this.starsGroup.getChildAt(j).x -= 15;
                    _this.starsGroup.getChildAt(i).x += 15;
                }
            }
        }

    },
    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },
    StoreArrayValues: function () {
        numer1 = [];
        denom1 = [];
        numer2 = [];
        denom2 = [];
        denomCom = []

        randarr = [1, 1, 1, 0, 0, 0]
        // 1 PROPER FRAC
        // 2 INPROPER FRAC
        randarr = _this.shuffle(randarr)
        valuesCombinationsNum = []
        valuesCombinationsDenom = []

        for (i = 0; i < 6; i++) {

            if (randarr[i] == 0) {
                num2 = Math.floor(Math.random() * (3 - 2 + 1) + 2)
                denom11 = Math.floor(Math.random() * (9 - 2 + 1) + 2)
                min = denom11 + 1;
                num1 = Math.floor(Math.random() * (10 - min + 1) + min)

                s1 = _this.simplestEquivalentFractionX(num1, denom11)
                s2 = _this.simplestEquivalentFractionY(num1, denom11);

                num1 = s1;
                denom11 = s2;

                while (denomCom.includes(num1 + "" + denom11) || num1 == 1 || denom11 == 1 || num1 == denom11 || num1 % denom11 == 0 || num2 * denom11 > 30 || denomCom.includes(num2)) {
                    num2 = Math.floor(Math.random() * (10 - 2 + 1) + 2)
                    denom11 = Math.floor(Math.random() * (9 - 2 + 1) + 2)
                    min = denom11 + 1;
                    num1 = Math.floor(Math.random() * (10 - min + 1) + min)
                    s1 = _this.simplestEquivalentFractionX(num1, denom11)
                    s2 = _this.simplestEquivalentFractionY(num1, denom11);
                    num1 = s1;
                    denom11 = s2;
                }

            }
            else {
                num2 = Math.floor(Math.random() * (3 - 2 + 1) + 2)
                denom11 = Math.floor(Math.random() * (10 - 2 + 1) + 2)
                max = denom11 - 1;
                num1 = Math.floor(Math.random() * (max - 2 + 1) + 2)

                s1 = _this.simplestEquivalentFractionX(num1, denom11)
                s2 = _this.simplestEquivalentFractionY(num1, denom11);

                num1 = s1;
                denom11 = s2;

                while (denomCom.includes(num1 + "" + denom11) || num1 == 1 || denom11 == 1 || num1 == denom11 || num1 % denom11 == 0 || num2 * denom11 > 30 || denomCom.includes(num1)) {
                    num2 = Math.floor(Math.random() * (10 - 2 + 1) + 2)
                    denom11 = Math.floor(Math.random() * (10 - 2 + 1) + 2)
                    max = denom11 - 1;
                    num1 = Math.floor(Math.random() * (max - 2 + 1) + 2)

                    s1 = _this.simplestEquivalentFractionX(num1, denom11)
                    s2 = _this.simplestEquivalentFractionY(num1, denom11);

                    num1 = s1;
                    denom11 = s2;
                }
            }

            denomCom.push(num1 + "" + denom11)
            denomCom.push(num2)
            denom1.push(denom11);
            denom2.push(1);
            numer1.push(num1)
            numer2.push(num2)
            valuesCombinationsNum.push(num1)
            valuesCombinationsDenom.push(num2 * denom11)
        }
        console.log(numer1)
        console.log(denom1)
        console.log(numer2)

    },
    simplestEquivalentFractionX: function (x, y) {
        t = x;
        s = y;
        for (m = 1; m <= x; m++) {
            if (y % m == 0 && x % m == 0) {
                t = x / m;
                s = y / m;

            }
        }
        return t;
    },
    simplestEquivalentFractionY: function (x, y) {
        t = x;
        s = y;
        for (m = 1; m <= x; m++) {
            if (y % m == 0 && x % m == 0) {
                t = x / m;
                s = y / m;

            }
        }
        return s;
    },
    showfraction2Boxes: function (addvar, y) {
        _this.twofractionboxes = true;
        _this.onebox = false;
        _this.fourNotEntered = false

        _this.AnswerBox = _this.add.image(addvar, y, 'white-box');
        _this.AnswerBox.scale.setTo(0.9)

        _this.AnswerBox.frame = 0;
        _this.q1 = false;

        _this.AnswerBox.inputEnabled = true;
        _this.AnswerBox.input.useHandCursor = true;
        _this.AnswerBox.events.onInputDown.add(function () {
            _this.AnswerBox.frame = 1;
            _this.AnswerBox1.frame = 0;
            _this.q2 = false;
            _this.clickSound.play();

            if (_this.AnswerBox.name == '') {
                _this.fourNotEntered = false
                _this.q1 = true;
                _this.q2 = false;
                _this.selectedAns2 = '';
                _this.selectedAns1 = '';
                _this.selectedAns3 = '';

            }
        });


        _this.divideSign = _this.add.graphics();
        _this.divideSign.lineStyle(4, 0x65B4C3);
        _this.divideSign.moveTo(addvar + 5, y + 5 + 43);
        _this.divideSign.lineTo(addvar + 39, y + 5 + 43);

        _this.AnswerBox1 = _this.add.image(addvar, y + 10 + 40, 'white-box');
        _this.AnswerBox1.scale.setTo(0.9);
        _this.AnswerBox1.frame = 1;
        _this.q2 = true;

        _this.AnswerBox1.inputEnabled = true;
        _this.AnswerBox1.input.useHandCursor = true;
        _this.AnswerBox1.events.onInputDown.add(function () {
            _this.AnswerBox.frame = 0;
            _this.AnswerBox1.frame = 1;
            _this.q1 = false;
            _this.clickSound.play();

            if (_this.AnswerBox1.name == '') {
                _this.fourNotEntered = false
                _this.q2 = true;
                _this.q1 = false;
                _this.selectedAns2 = '';
                _this.selectedAns1 = '';
                _this.selectedAns3 = '';

            }
        });


    },
    MakeSideBar: function () {
        //edited for baseurl apk
        _this.sceneCount++;
        // _this.AnsTimerCount = 0;
        _this.noofAttempts = 0;
        //....

        _this.sideGray = _this.add.sprite(30, 70, 'box_3');
        colorsarr = [];
        _this.finalPart = false;
        // colors = ['orangecolor', 'bluecolor', 'browncolor', 'darkcolor', 'darkGreencolor', 'yellowcolor', 'purplecolor', 'lightGreencolor', 'redcolor', 'whitecolor']
        for (j = 0; j < 10; j++) {
            for (i = 0; i < 10 - j; i++) {
                box = _this.add.sprite(8 + i * 19, 10 + (10 - (10 - j)) * 37, 'allColor')
                box.frame = (10 - j) - 1;
                colorsarr.push(box);
                _this.sideGray.addChild(box);
            }
        }

        _this.reverse = _this.add.sprite(85, 310, 'reverse');
        _this.sideGray.addChild(_this.reverse)
        _this.showInitialScreen()
    },
    showInitialScreen: function () {

        _this.Question_flag = 1;
        _this.rverseclick = 0;
        if (_this.count1 == 0)
            _this.Ask_Question1.play();
        _this.cubegrp = false;
        _this.questionBox = _this.add.sprite(250, 70, 'Text box_1')
        _this.AnsBox = _this.add.sprite(250, 180, 'box_2')
        _this.AnsBox.scale.setTo(1.01, 1)

        _this.AnsBox2 = _this.add.sprite(250, 180, 'box_1')
        _this.AnsBox2.visible = false

        _this.yellowBox = _this.add.sprite(25 - 4, 11, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox)
        _this.yellowBox.visible = false;

        if (numer1[_this.count1] >= 10)
            _this.n1 = _this.add.text(26 - 4, 14, numer1[_this.count1])
        else
            _this.n1 = _this.add.text(34 - 4, 14, numer1[_this.count1])

        _this.questionBox.addChild(_this.n1)
        _this.applyingStyle(_this.n1);

        _this.hrLine(25 - 4, 47.5);
        _this.questionBox.addChild(_this.hrSign1);

        _this.yellowBox2 = _this.add.sprite(25 - 4, 51, 'yellowTextbox');
        _this.questionBox.addChild(_this.yellowBox2)
        _this.yellowBox2.visible = false;

        if (denom1[_this.count1] >= 10)
            _this.d1 = _this.add.text(26 - 4, 52, denom1[_this.count1])
        else
            _this.d1 = _this.add.text(34 - 4, 52, denom1[_this.count1])

        _this.questionBox.addChild(_this.d1)
        _this.applyingStyle(_this.d1);

        _this.plusSignBlue(315 - 3, 117);
        _this.pSign11 = _this.pSign1;
        _this.pSign21 = _this.pSign2;
        _this.pSign31 = _this.pSign3;

        _this.yellowBox3 = _this.add.sprite(90 - 4, 11, 'yellowTextbox')
        _this.questionBox.addChild(_this.yellowBox3)
        _this.yellowBox3.visible = false;

        if (numer2[_this.count1] >= 10)
            _this.n2 = _this.add.text(91 - 4, 39, numer2[_this.count1])
        else
            _this.n2 = _this.add.text(99 - 4, 30, numer2[_this.count1])

        _this.questionBox.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.showWholeBox();

        _this.box1Display = _this.add.sprite(260, 188, 'Text box_3');
        _this.box1Display.visible = false;

        // Colors group
        _this.orangeGrp = _this.add.group();
        _this.blueGrp = _this.add.group();
        _this.brownGrp = _this.add.group();
        _this.darkGrp = _this.add.group();
        _this.darkGreenGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.purpleGrp = _this.add.group();
        _this.lightGreenGrp = _this.add.group();
        _this.redGrp = _this.add.group();
        _this.whiteGrp = _this.add.group();

        _this.ans1Grp = _this.add.group();
        _this.ans2Grp = _this.add.group();
        _this.ans4Grp = _this.add.group();
        _this.ans3Grp = _this.add.group();

        _this.eraser = _this.add.sprite(175, 380, 'eraser');

        _this.borderBox1 = _this.add.group();
        _this.borderBox2 = _this.add.group();
        _this.borderBox3 = _this.add.group();
        _this.borderBox4 = _this.add.group();



    },
    showWholeBox: function () {

        _this.time.events.add(1500, function () {
            _this.onebox = true;
            _this.fourNotEntered = false;

            _this.tweenNumber = _this.add.tween(_this.n2);
            _this.tweenNumber.to({ x: _this.n2.x, y: 14 }, 500, 'Linear', true, 0);
            _this.tweenNumber.start();

            _this.tweenNumber.onComplete.add(function () {

                _this.hrLine(90 - 4, 47.5);
                _this.questionBox.addChild(_this.hrSign1);

                _this.AnswerBox = _this.add.image(332, 119, 'white-box');
                _this.AnswerBox.scale.setTo(0.8)
                _this.AnswerBox.frame = 1;
                _this.addNumberPad();
            });
        })

    },
    makeHrBoxes: function (len, name) {

        for (i = 0; i < len; i++) {
            box = _this.add.sprite(38 + i * 19, 80 + (10 - len) * 37, 'allColor')
            box.frame = len - 1
            if (box.frame == 9)
                _this.orangeGrp.addChild(box);
            else if (box.frame == 8)
                _this.blueGrp.addChild(box);
            else if (box.frame == 7) {
                _this.brownGrp.addChild(box);
            }
            else if (box.frame == 6)
                _this.darkGrp.addChild(box);
            else if (box.frame == 5)
                _this.darkGreenGrp.addChild(box);
            else if (box.frame == 4)
                _this.yellowGrp.addChild(box);
            else if (box.frame == 3)
                _this.purpleGrp.addChild(box);
            else if (box.frame == 2)
                _this.lightGreenGrp.addChild(box);
            else if (box.frame == 1)
                _this.redGrp.addChild(box);
            else if (box.frame == 0)
                _this.whiteGrp.addChild(box);
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdate, _this);
            box.events.onDragStop.add(_this.dragStop, _this);
        }
    },
    dragUpdate: function (target) {

        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;
        var draggedCubex = target.x - 25;
        var draggedCubey = target.y;
        if (target.frame == 9) {
            grp = _this.orangeGrp
        }
        if (target.frame == 8) {
            grp = _this.blueGrp
        }
        if (target.frame == 7) {
            grp = _this.brownGrp
        }
        if (target.frame == 6) {
            grp = _this.darkGrp
        }
        if (target.frame == 5) {
            grp = _this.darkGreenGrp
        }
        if (target.frame == 4) {
            grp = _this.yellowGrp
        }
        if (target.frame == 3) {
            grp = _this.purpleGrp
        }
        if (target.frame == 2) {
            grp = _this.lightGreenGrp
        }
        if (target.frame == 1) {
            grp = _this.redGrp
        }
        if (target.frame == 0) {
            grp = _this.whiteGrp
        }
        for (let k = Number(target.name); k < target.frame + 1; k++) {
            grp.getChildAt(k).y = draggedCubey
            grp.getChildAt(k).x = draggedCubex + 19 * frontpos;
            frontpos++;
        }
        for (let k = Number(target.name) - 1; k >= 0; k--) {
            grp.getChildAt(k).y = draggedCubey;
            grp.getChildAt(k).x = draggedCubex - 19 * backpos;
            backpos++
        }

    },
    disableSidebar: function () {
        _this.blueGrp.destroy();
        _this.brownGrp.destroy();
        _this.redGrp.destroy();
        _this.whiteGrp.destroy();
        _this.darkGrp.destroy();
        _this.purpleGrp.destroy();
        _this.lightGreenGrp.destroy();
        _this.darkGreenGrp.destroy();
        _this.yellowGrp.destroy();
        _this.orangeGrp.destroy();


    },
    reCreatehrGrp: function () {

        _this.disableSidebar();
        _this.orangeGrp = _this.add.group();
        _this.blueGrp = _this.add.group();
        _this.brownGrp = _this.add.group();
        _this.darkGrp = _this.add.group();
        _this.darkGreenGrp = _this.add.group();
        _this.yellowGrp = _this.add.group();
        _this.purpleGrp = _this.add.group();
        _this.lightGreenGrp = _this.add.group();
        _this.redGrp = _this.add.group();
        _this.whiteGrp = _this.add.group();

        for (j = 0; j < 10; j++) {
            _this.makeHrBoxes(10 - j, 'abcd')
        }

    },
    dragStop: function (target) {

        if (_this.firstFrac == true) {
            matchy1 = 160;
            matchy2 = 245;
        }
        else {
            matchy1 = 260
            matchy2 = 350;
        }

        if (_this.checkOverlap(target, _this.AnsBox) && target.y >= matchy1 && target.y <= matchy2) {

            if (_this.yellowBox2.visible == true && (_this.ans1Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans1Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans1Grp.getChildAt(_this.ans1Grp.children.length - 1).x + 19;
                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 219, 'allColor');
                    box.lastidx = x;
                    box.frame = target.frame
                    _this.ans1Grp.addChild(box);
                }

                _this.borderBox1.destroy();
                _this.borderBox1 = _this.add.group();
                if (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans1Grp.getChildAt(0).frame;
                    for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                        if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
                            borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                            _this.borderBox1.addChild(_this.graphics);

                        }
                        if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
                    _this.borderBox1.addChild(_this.graphics);

                }
            }

            else if (_this.yellowBox.visible == true && (_this.ans2Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans2Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans2Grp.getChildAt(_this.ans2Grp.children.length - 1).x + 19;
                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 199, 'allColor')
                    box.frame = target.frame;
                    box.lastidx = x;
                    _this.ans2Grp.addChild(box);
                }
                _this.borderBox2.destroy();
                _this.borderBox2 = _this.add.group();
                if (_this.ans2Grp.length > 10 || _this.ans2Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans2Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans2Grp.length - 1; q++) {
                        if ((_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grp)) || (count == currFrame)) {
                            _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                            borderboxc += (19 * (_this.ans2Grp.getChildAt(q).frame + 1));
                            _this.borderBox2.addChild(_this.graphics);
                        }
                        if (_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame || currFrame == count) {
                            currFrame = _this.ans2Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    _this.borderBox2.addChild(_this.graphics);

                }
            }
            else if (_this.yellowBox3.visible == true && (_this.ans3Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans3Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans3Grp.getChildAt(_this.ans3Grp.children.length - 1).x + 19;

                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 300, 'allColor')
                    box.frame = target.frame;
                    box.lastidx = x;
                    _this.ans3Grp.addChild(box);
                }
                _this.borderBox3.destroy();
                _this.borderBox3 = _this.add.group();
                if (_this.ans3Grp.length > 10 || _this.ans3Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans3Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans3Grp.length - 1; q++) {
                        if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (currFrame == count)) {
                            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
                            borderboxc += (19 * (_this.ans3Grp.getChildAt(q).frame + 1));
                            _this.borderBox3.addChild(_this.graphics);
                        }
                        if (_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame || count == currFrame) {
                            currFrame = _this.ans3Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
                    _this.borderBox3.addChild(_this.graphics);

                }
            }

            else if (_this.yellowBox4.visible == true && (_this.ans4Grp.children.length + target.frame + 1) <= 30) {
                if (_this.ans4Grp.children.length == 0) {
                    x = 310;
                }
                else {
                    x = _this.ans4Grp.getChildAt(_this.ans4Grp.children.length - 1).x + 19;

                }
                for (i = 0; i < target.frame + 1; i++) {
                    box = _this.add.sprite(x + i * 19, 320, 'allColor')
                    box.frame = target.frame;
                    box.lastidx = x;
                    _this.ans4Grp.addChild(box);
                }
                _this.borderBox4.destroy();
                _this.borderBox4 = _this.add.group();
                if (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (target.frame + 1)) {
                    borderboxc = 313;
                    count = 0;
                    currFrame = _this.ans4Grp.getChildAt(0).frame;

                    for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                        if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (count == currFrame)) {
                            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 322, borderboxc);
                            borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                            _this.borderBox4.addChild(_this.graphics);
                        }
                        if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || count == currFrame) {
                            currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                            count = 0;
                        }
                        else {
                            count++;
                        }
                    }
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 322, borderboxc);
                    _this.borderBox4.addChild(_this.graphics);

                }
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();


        }
        _this.reCreatehrGrp();


    },
    eraserUpdate: function (target) {
        _this.world.bringToTop(_this.eraser)
        _this.eraser.scale.setTo(0.8)
    },
    eraserDrop: function (target) {
        _this.NotErased = true
        if (_this.cubegrp != true) {
            if (_this.yellowBox2.visible == true)
                tobeckedbox = _this.ans1Grp;
            else if (_this.yellowBox.visible == true)
                tobeckedbox = _this.ans2Grp;
            else if (_this.yellowBox4.visible == true)
                tobeckedbox = _this.ans4Grp;
            else if (_this.yellowBox3.visible == true)
                tobeckedbox = _this.ans3Grp;

            for (k = 0; k < tobeckedbox.children.length; k++) {

                if (_this.checkOverlap(tobeckedbox.getChildAt(k), target)) {
                    target.x = 175;
                    target.y = 380;
                    _this.deleteGrp(tobeckedbox.getChildAt(k).lastidx, tobeckedbox)
                    _this.eraser.scale.setTo(1);

                    break;

                }
            };
        }
        else {
            if (_this.checkOverlap(target, _this.ans3Grpcpys) || _this.checkOverlap(target, _this.ans4Grpcpys)) {

                if (_this.ans4Grpcpys.length > _this.ans4Grp.length) {
                    x = _this.ans4Grpcpys.length - 1;
                    y = _this.ans3Grpcpys.length - 1;
                    _this.ans4Grpcpy.destroy();
                    _this.ans3Grpcpy.destroy();
                    _this.ans1Grpcpy.destroy();
                    _this.ans2Grpcpy.destroy();

                    if (x > 0) {
                        for (i = x; i > (x - _this.ans4Grp.length); i--) {
                            _this.ans4Grpcpys.getChildAt(i).destroy()
                        }
                        for (i = y; i > (y - _this.ans3Grp.length); i--) {
                            _this.ans3Grpcpys.getChildAt(i).destroy()
                        }
                        _this.makeDraggableCubeGrp();
                    }
                }



                target.x = 175;
                target.y = 380;
                _this.eraser.scale.setTo(1);
                _this.remakeGrpBorders();

            }
            else if (_this.checkOverlap(target, _this.ans1Grpcpys) || _this.checkOverlap(target, _this.ans2Grpcpys)) {

                if (_this.ans1Grpcpys.length > _this.ans1Grp.length) {

                    x = _this.ans1Grpcpys.length - 1;
                    y = _this.ans2Grpcpys.length - 1;
                    _this.ans4Grpcpy.destroy();
                    _this.ans3Grpcpy.destroy();
                    _this.ans1Grpcpy.destroy();
                    _this.ans2Grpcpy.destroy();
                    if (x > 0) {
                        for (i = x; i > (x - _this.ans1Grp.length); i--) {
                            _this.ans1Grpcpys.getChildAt(i).destroy()
                        }
                        for (i = y; i > (y - _this.ans2Grp.length); i--) {
                            _this.ans2Grpcpys.getChildAt(i).destroy()
                        }
                        _this.makeDraggableCubeGrp();
                    }
                }

                target.x = 175;
                target.y = 380;
                _this.eraser.scale.setTo(1);
                _this.remakeGrpBorders();

            }

            _this.world.bringToTop(_this.borderBox21);
            _this.world.bringToTop(_this.borderBox11);
            _this.world.bringToTop(_this.borderBox41);
            _this.world.bringToTop(_this.borderBox31);

        }
        target.x = 175;
        target.y = 380;
        _this.eraser.scale.setTo(1);

    },
    deleteGrp: function (idx, grp) {
        for (t = 0; t < grp.children.length; t++) {
            element = grp.getChildAt(t)
            if (element.lastidx == idx) {
                element.destroy();
                t = -1;
            }
        };

        grp.children.forEach((element, i) => {
            minus = 310 + i * 19;
            element.x = minus;
        });

        _this.remakeCubes(grp);
    },
    remakeCubes: function (grp) {
        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox4.destroy();
        _this.borderBox1 = _this.add.group();
        _this.borderBox2 = _this.add.group();
        _this.borderBox3 = _this.add.group();
        _this.borderBox4 = _this.add.group();

        if (_this.ans1Grp.length > 0 && (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (_this.ans1Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans1Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
                    borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                    _this.borderBox1.addChild(_this.graphics);

                }
                if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 221, borderboxc);
            _this.borderBox1.addChild(_this.graphics);

        }
        if (_this.ans2Grp.length > 0 && (_this.ans2Grp.length > 10 || _this.ans2Grp.length > (_this.ans2Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans2Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans2Grp.length - 1; q++) {
                if ((_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans2Grp.getChildAt(q).frame + 1));
                    _this.borderBox2.addChild(_this.graphics);
                }
                if (_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans2Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 221 - 20, borderboxc);
            _this.borderBox2.addChild(_this.graphics);

        }
        if (_this.ans3Grp.length > 0 && (_this.ans3Grp.length > 10 || _this.ans3Grp.length > (_this.ans3Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans3Grp.length - 1; q++) {
                if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans3Grp.getChildAt(q).frame + 1));
                    _this.borderBox3.addChild(_this.graphics);
                }
                if (_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans3Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 322 - 20, borderboxc);
            _this.borderBox3.addChild(_this.graphics);

        }
        if (_this.ans4Grp.length > 0 && (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (_this.ans4Grp.getChildAt(0).frame + 1))) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans4Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 322, borderboxc);
                    borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                    _this.borderBox4.addChild(_this.graphics);
                }
                if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 322, borderboxc);
            _this.borderBox4.addChild(_this.graphics);

        }


    },
    remakeGrpBorders: function () {
        _this.borderBox11.destroy();
        _this.borderBox21.destroy();
        _this.borderBox31.destroy();
        _this.borderBox41.destroy();
        _this.borderBox11 = _this.add.group();
        _this.borderBox21 = _this.add.group();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();

        if (_this.ans1Grpcpys.length > 10 || _this.ans1Grpcpys.length > (_this.ans1Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            for (q = 0; q < _this.ans1Grpcpys.length - 1; q++) {
                if ((_this.ans1Grpcpys.getChildAt(q).frame != _this.ans1Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grpcpys))) {

                    _this.makeRectBox(_this.ans1Grpcpys.getChildAt(q).frame + 1, 402, borderboxc);
                    borderboxc += (19 * (_this.ans1Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox11.addChild(_this.graphics);

                }
            }
            _this.makeRectBox(_this.ans1Grpcpys.getChildAt(q).frame + 1, 402, borderboxc);
            _this.borderBox11.addChild(_this.graphics);

        }

        if (_this.ans2Grpcpys.length > 10 || _this.ans2Grpcpys.length > (_this.ans2Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            for (q = 0; q < _this.ans2Grpcpys.length - 1; q++) {
                if ((_this.ans2Grpcpys.getChildAt(q).frame != _this.ans2Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grpcpys))) {

                    _this.makeRectBox(_this.ans2Grpcpys.getChildAt(q).frame + 1, 402 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans2Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox21.addChild(_this.graphics);

                }
            }
            _this.makeRectBox(_this.ans2Grpcpys.getChildAt(q).frame + 1, 402 - 20, borderboxc);
            _this.borderBox21.addChild(_this.graphics);

        }

        _this.borderBox31.destroy();
        _this.borderBox31 = _this.add.group();
        if (_this.ans3Grpcpys.length > 10 || _this.ans3Grpcpys.length > (_this.ans3Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            for (q = 0; q < _this.ans3Grpcpys.length - 1; q++) {
                if ((_this.ans3Grpcpys.getChildAt(q).frame != _this.ans3Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grpcpys))) {
                    _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
                    borderboxc += (19 * (_this.ans3Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox31.addChild(_this.graphics);

                }
            }
            _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
            _this.borderBox31.addChild(_this.graphics);

        }

        _this.borderBox41.destroy();
        _this.borderBox41 = _this.add.group();
        if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (_this.ans4Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grpcpys))) {
                    _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
                    borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);

                }
            }
            _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
            _this.borderBox41.addChild(_this.graphics);
        }

    },
    changeQuesBox: function () {
        _this.questionBox.destroy();
        _this.pSign11.destroy();
        _this.pSign21.destroy();
        _this.pSign31.destroy();

        if (_this.finalPart != true)
            _this.questionBox2 = _this.add.sprite(246, 55, 'Text box_2cpy')
        else {
            _this.questionBox2 = _this.add.sprite(248, 55, 'Text box_2');
            _this.selectedAns1 = '';
            _this.selectedAns2 = '';
            _this.selectedAns3 = ''
            _this.AnswerBox.name = '';
            _this.enterTxt = '';
            _this.fourNotEntered = false;
            _this.showfraction2Boxes(430, 70);
            _this.AnswerBox.scale.setTo(1);
            _this.AnswerBox1.scale.setTo(1);
            _this.divideSign.destroy();
            _this.AnswerBox.y -= 6;
            _this.AnswerBox1.y -= 1;
            _this.Question_flag = 2;
            if (_this.count1 == 0)
                _this.Ask_Question2.play();

        }


        if (numer1[_this.count1] >= 10)
            _this.n1 = _this.add.text(26 - 4, 14 + 14, numer1[_this.count1])
        else
            _this.n1 = _this.add.text(34 - 4, 14 + 14, numer1[_this.count1])

        _this.questionBox2.addChild(_this.n1)
        _this.applyingStyle(_this.n1);
        _this.hrLine(25 - 4, 47.5 + 14);
        _this.questionBox2.addChild(_this.hrSign1);


        if (denom1[_this.count1] >= 10)
            _this.d1 = _this.add.text(26 - 4, 52 + 14, denom1[_this.count1])
        else
            _this.d1 = _this.add.text(34 - 4, 52 + 14, denom1[_this.count1])

        _this.questionBox2.addChild(_this.d1)
        _this.applyingStyle(_this.d1);


        _this.plusSignBlue(315 - 6, 117)


        if (numer2[_this.count1] >= 10)
            _this.n2 = _this.add.text(91 - 4, 14 + 14, numer2[_this.count1])
        else
            _this.n2 = _this.add.text(99 - 4, 14 + 14, numer2[_this.count1])

        _this.questionBox2.addChild(_this.n2)
        _this.applyingStyle(_this.n2);
        _this.hrLine(90 - 4, 47.5 + 14);
        _this.questionBox2.addChild(_this.hrSign1);

        if (denom2[_this.count1] >= 10)
            _this.d2 = _this.add.text(91 - 4, 52 + 14, denom2[_this.count1])
        else
            _this.d2 = _this.add.text(99 - 4, 52 + 14, denom2[_this.count1])


        _this.questionBox2.addChild(_this.d2)
        _this.applyingStyle(_this.d2);


        _this.yelloBox5 = _this.add.sprite(385, 100, 'yellowTextbox')
        _this.blueeqsign = _this.add.text(394, 100, '=');
        _this.blueeqsign.fill = '#65B4C3'


        if (_this.finalPart != true) {
            _this.makeansCpy();
            _this.reverse.frame = 1;
        }

    },
    reverseCubes: function () {
        if (_this.ans3Grpcpys.getChildAt(0).y == 440) {
            _this.ans3Grpcpy.children.forEach(element => {
                element.y = 460;
            });
            _this.ans4Grpcpy.children.forEach(element => {
                element.y = 440;
            });
            _this.ans3Grpcpys.children.forEach(element => {
                element.y = 460;
            });
            _this.ans4Grpcpys.children.forEach(element => {
                element.y = 440;
            });
        }
        _this.borderBox31.destroy();
        _this.borderBox41.destroy();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();
        if (_this.ans3Grpcpys.length > 10 || _this.ans3Grpcpys.length > (_this.ans3Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grpcpys.getChildAt(0).frame;

            for (q = 0; q < _this.ans3Grpcpys.length - 1; q++) {
                if ((_this.ans3Grpcpys.getChildAt(q).frame != _this.ans3Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grpcpys)) || (count == currFrame)) {
                    if (_this.ans3Grpcpys.getChildAt(0).y == 440)
                        _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
                    else
                        _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);

                    borderboxc += (19 * (_this.ans3Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox31.addChild(_this.graphics);

                }
                if (_this.ans3Grpcpys.getChildAt(q).frame != _this.ans3Grpcpys.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = _this.ans3Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            if (_this.ans3Grpcpys.getChildAt(0).y == 440)
                _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
            else
                _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
            _this.borderBox31.addChild(_this.graphics);

        }
        if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (_this.ans4Grpcpys.getChildAt(0).frame + 1)) {
            count = 0;
            currFrame = _this.ans4Grpcpys.getChildAt(0).frame;
            borderboxc = 313;
            for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grpcpys)) || (count == currFrame)) {
                    if (_this.ans4Grpcpys.getChildAt(0).y == 460)
                        _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
                    else
                        _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
                    borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);

                }
                if (_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = _this.ans4Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            if (_this.ans4Grpcpys.getChildAt(0).y == 460)
                _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
            else
                _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
            _this.borderBox41.addChild(_this.graphics);

        }
    },
    reverseClicked: function () {
        _this.clickSound.play();
        _this.reverse.frame = _this.reverse.frame == 1 ? 0 : 1;
        _this.reverse.inputEnabled = false;
        if (_this.rverseclick == 0) {
            _this.rightbtn = _this.add.sprite(850, 70, 'TickBtn')
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.events.onInputDown.add(_this.evaluateCubesGrp, _this)

        }
        if (_this.rverseclick == 0 && (!_this.ans1Grpcpy || _this.ans1Grpcpy.length == 0)) {
            _this.makeDraggableCubeGrp();
        }
        _this.reverseCubes();


        if (_this.cubegrp == true && _this.reverse.frame == 0) {

            if ((_this.ans2Grpcpys.length + _this.ans3Grpcpys.length == valuesCombinationsNum[_this.count1]) && (_this.ans1Grpcpys.length == _this.ans4Grpcpys.length) && (_this.ans1Grpcpys.length == valuesCombinationsDenom[_this.count1])) {

                _this.time.events.add(500, () => {
                    _this.framechange.play();
                    _this.cubegrp = false;
                    _this.enterFrac = true;
                    _this.eraser.inputEnabled = false;
                    _this.reverse.inputEnabled = false;

                    _this.time.events.add(500, () => {
                        _this.reArrangeScreen()
                    })
                })
            }
        }
        _this.rverseclick++;

    },
    evaluateCubesGrp: function () {
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.frame = 1;
        if ((_this.ans1Grpcpys.length == _this.ans4Grpcpys.length) && (_this.ans1Grpcpys.length == denom1[_this.count1])) {
            _this.ans1Grpcpy.destroy();
            _this.ans2Grpcpy.destroy();
            _this.ans3Grpcpy.destroy();
            _this.ans4Grpcpy.destroy();
            _this.counterCelebrationSound.play();
            _this.time.events.add(500, () => {
                _this.eraser.inputEnabled = false;
                _this.reverse.inputEnabled = true;
                _this.rightbtn.destroy();

                _this.time.events.add(500, () => {
                    {
                        _this.framechange.play();
                        _this.cubegrp = false;
                        _this.enterFrac = true;
                        _this.eraser.inputEnabled = false;
                        _this.reverse.inputEnabled = false;

                        _this.time.events.add(500, () => {
                            _this.reArrangeScreen();
                        })
                    }
                })
            })
        }
        else {
            _this.wrongans.play();
            _this.rightbtn.inputEnabled = true;
            _this.rightbtn.frame = 0;

            _this.ans1Grpcpys.destroy();
            _this.ans2Grpcpys.destroy();
            _this.ans3Grpcpys.destroy();
            _this.ans4Grpcpys.destroy();

            _this.ans1Grpcpy.destroy();
            _this.ans2Grpcpy.destroy();
            _this.ans3Grpcpy.destroy();
            _this.ans4Grpcpy.destroy();

            _this.borderBox11.destroy();
            _this.borderBox21.destroy();
            _this.borderBox31.destroy();
            _this.borderBox41.destroy();

            _this.makeansCpy();
            _this.reverseCubes();
            _this.makeDraggableCubeGrp();
            _this.reverse.inputEnabled = false;

        }

    },
    grayDenoms: function () {
        _this.snapSound.play();
        _this.ans4Grpcpys.visible = false;
        _this.ans3Grpcpys1.visible = true;

        _this.ans1Grpcpys.visible = false;
        _this.ans1Grpcpys1.visible = true
        _this.borderBox11.destroy();
        _this.borderBox41.destroy();

        _this.time.events.add(600, () => {
            if (_this.count1 == 0) {
                _this.time.events.add(600, _this.showHandSymbol)
            }
            else
                _this.enableCubesDrag()
        })
    },
    makeansCpy: function () {

        _this.ans1Grpcpys = _this.add.group();
        _this.ans2Grpcpys = _this.add.group();
        _this.ans4Grpcpys = _this.add.group();
        _this.ans3Grpcpys = _this.add.group();

        _this.borderBox11 = _this.add.group();
        _this.borderBox21 = _this.add.group();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();

        for (i = 0; i < _this.ans1Grp.length; i++) {
            box = _this.add.sprite(310 + i * 19, 400, 'allColor')
            box.frame = _this.ans1Grp.getChildAt(i).frame;
            _this.ans1Grpcpys.addChild(box);
        }

        if (_this.ans1Grp.length > 10 || _this.ans1Grp.length > (_this.ans1Grp.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans1Grp.getChildAt(0).frame;
            for (q = 0; q < _this.ans1Grp.length - 1; q++) {
                if ((_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 402, borderboxc);
                    borderboxc += (19 * (_this.ans1Grp.getChildAt(q).frame + 1));
                    _this.borderBox11.addChild(_this.graphics);
                }
                if (_this.ans1Grp.getChildAt(q).frame != _this.ans1Grp.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = _this.ans1Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans1Grp.getChildAt(q).frame + 1, 402, borderboxc);
            _this.borderBox11.addChild(_this.graphics);

        }
        for (i = 0; i < _this.ans2Grp.length; i++) {
            box = _this.add.sprite(310 + i * 19, 380, 'allColor')
            box.frame = _this.ans2Grp.getChildAt(i).frame;
            _this.ans2Grpcpys.addChild(box);

        }

        if (_this.ans2Grp.length > 10 || _this.ans2Grp.length > (_this.ans2Grp.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans2Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans2Grp.length - 1; q++) {
                if ((_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 402 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans2Grp.getChildAt(q).frame + 1));
                    _this.borderBox21.addChild(_this.graphics);
                }
                if (_this.ans2Grp.getChildAt(q).frame != _this.ans2Grp.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = _this.ans2Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans2Grp.getChildAt(q).frame + 1, 402 - 20, borderboxc);
            _this.borderBox21.addChild(_this.graphics);

        }
        for (i = 0; i < _this.ans3Grp.length; i++) {
            box = _this.add.sprite(310 + i * 19, 440, 'allColor')
            box.frame = _this.ans3Grp.getChildAt(i).frame;
            _this.ans3Grpcpys.addChild(box);

        }

        if (_this.ans3Grp.length > 10 || _this.ans3Grp.length > (_this.ans3Grp.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans3Grp.length - 1; q++) {
                if ((_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grp)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 422 + 20, borderboxc);
                    borderboxc += (19 * (_this.ans3Grp.getChildAt(q).frame + 1));
                    _this.borderBox31.addChild(_this.graphics);
                }
                if (_this.ans3Grp.getChildAt(q).frame != _this.ans3Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans3Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans3Grp.getChildAt(q).frame + 1, 422 + 20, borderboxc);
            _this.borderBox31.addChild(_this.graphics);

        }
        for (i = 0; i < _this.ans4Grp.length; i++) {
            box = _this.add.sprite(310 + i * 19, 460, 'allColor')
            box.frame = _this.ans4Grp.getChildAt(i).frame;
            _this.ans4Grpcpys.addChild(box);
        }

        if (_this.ans4Grp.length > 10 || _this.ans4Grp.length > (_this.ans4Grp.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans4Grp.getChildAt(0).frame;

            for (q = 0; q < _this.ans4Grp.length - 1; q++) {
                if ((_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grp)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 422 + 40, borderboxc);
                    borderboxc += (19 * (_this.ans4Grp.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);
                }
                if (_this.ans4Grp.getChildAt(q).frame != _this.ans4Grp.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans4Grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans4Grp.getChildAt(q).frame + 1, 422 + 40, borderboxc);
            _this.borderBox41.addChild(_this.graphics);

        }
        if (_this.count1 == 0 && !_this.reverseDemoShown) {
            _this.reverseDemoShown = true;
            _this.showReverseHand();
        }
        else {
            _this.reverse.inputEnabled = true;
            _this.reverse.events.onInputDown.add(_this.reverseClicked, _this);
        }

    },
    showHandSymbol: function () {

        _this.draggableCpy = _this.add.group();
        _this.hand = _this.add.sprite(_this.ans3Grpcpys.getChildAt(_this.ans3Grpcpys.length - 1).x, 330, 'hand');
        _this.hand.scale.setTo(0.6);
        for (i = 0; i < _this.ans3Grpcpys.length; i++) {
            box = _this.add.sprite(_this.ans3Grpcpys.getChildAt(i).x, _this.ans3Grpcpys.getChildAt(i).y, 'allColor')
            box.frame = _this.ans3Grpcpys.getChildAt(i).frame;
            _this.draggableCpy.addChild(box);
        }

        _this.dragableGrp = _this.add.group();
        _this.dragableGrp.addChild(_this.draggableCpy);
        _this.dragableGrp.addChild(_this.hand);

        _this.tween1 = _this.add.tween(_this.dragableGrp);
        _this.tween1.to({ x: 0, y: 94 }, 500, 'Linear', true, 0);
        _this.tween1.onComplete.add(() => {
            _this.time.events.add(500, () => {
                _this.dragableGrp.destroy();
                _this.enableCubesDrag();
            })
        })

    },
    showReverseHand: function () {

        _this.hand = _this.add.sprite(135, 405, 'hand');
        _this.hand.scale.setTo(0.55);

        _this.time.events.add(1200, () => {
            _this.clickSound.play()
            _this.hand.scale.setTo(0.5);
            _this.time.events.add(800, () => {
                _this.hand.scale.setTo(0.55);
            })

        })

        _this.time.events.add(3200, () => {
            _this.hand.destroy();
            _this.reverse.frame = 1;

            _this.reverse.inputEnabled = true;
            _this.reverse.events.onInputDown.add(_this.reverseClicked, _this);
        })

    },
    makeDraggableCubeGrp: function () {
        _this.ans1Grpcpy = _this.add.group();
        _this.ans2Grpcpy = _this.add.group();
        _this.ans4Grpcpy = _this.add.group();
        _this.ans3Grpcpy = _this.add.group();

        for (i = 0; i < _this.ans1Grp.children.length; i++) {

            if (_this.ans1Grpcpys.length + _this.ans1Grp.length <= 30 && _this.ans2Grpcpys.length + _this.ans2Grp.length <= 30) {
                p = _this.ans1Grpcpys.getChildAt(_this.ans1Grpcpys.children.length - _this.ans1Grp.length).x + i * 19
                box = _this.add.sprite(p, 400, 'allColor')
                box.frame = _this.ans1Grp.getChildAt(i).frame;
                _this.ans1Grpcpy.addChild(box);
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragUpdate.add(_this.dragUpdategrp, _this);
                box.events.onDragStop.add(_this.dragStopgrp, _this);
            }

        }
        for (i = 0; i < _this.ans2Grp.length; i++) {
            if (_this.ans1Grpcpys.length + _this.ans1Grp.length <= 30 && _this.ans2Grpcpys.length + _this.ans2Grp.length <= 30) {

                p = _this.ans2Grpcpys.getChildAt(_this.ans2Grpcpys.children.length - _this.ans2Grp.length).x + i * 19
                box = _this.add.sprite(p, 380, 'allColor')
                box.frame = _this.ans2Grp.getChildAt(i).frame;
                _this.ans2Grpcpy.addChild(box);
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragUpdate.add(_this.dragUpdategrp, _this);
                box.events.onDragStop.add(_this.dragStopgrp, _this);
            }
        }

        for (i = 0; i < _this.ans3Grp.length; i++) {
            if (_this.ans3Grpcpys.length + _this.ans3Grp.length <= 30 && _this.ans4Grpcpys.length + _this.ans4Grp.length <= 30) {
                p = _this.ans3Grpcpys.getChildAt(_this.ans3Grpcpys.children.length - _this.ans3Grp.length).x + i * 19;
                y = _this.ans3Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(p, y, 'allColor')
                box.frame = _this.ans3Grp.getChildAt(i).frame;
                _this.ans3Grpcpy.addChild(box);
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragUpdate.add(_this.dragUpdategrp, _this);
                box.events.onDragStop.add(_this.dragStopgrp, _this);
            }
        }
        for (i = 0; i < _this.ans4Grp.length; i++) {
            if (_this.ans3Grpcpys.length + _this.ans3Grp.length <= 30 && _this.ans4Grpcpys.length + _this.ans4Grp.length <= 30) {
                p = _this.ans4Grpcpys.getChildAt(_this.ans4Grpcpys.children.length - _this.ans4Grp.length).x + i * 19;
                y = _this.ans4Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(p, y, 'allColor')
                box.frame = _this.ans4Grp.getChildAt(i).frame;
                _this.ans4Grpcpy.addChild(box);
                box.inputEnabled = true;
                box.input.enableDrag(true);
                box.events.onDragUpdate.add(_this.dragUpdategrp, _this);
                box.events.onDragStop.add(_this.dragStopgrp, _this);
            }
        }
        _this.world.bringToTop(_this.borderBox21);
        _this.world.bringToTop(_this.borderBox11);
        _this.world.bringToTop(_this.borderBox41);
        _this.world.bringToTop(_this.borderBox31);
    },
    dragUpdategrp: function (target) {
        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;

        var draggedCubex = target.x - 25;
        var draggedCubey = target.y;
        if (_this.ans1Grpcpy.children.includes(target)) {

            grp = _this.ans1Grpcpy;
            grp2 = _this.ans2Grpcpy;
            grp1f = _this.ans1Grp.length;
            grp2f = _this.ans2Grp.length;


        }
        else if (_this.ans2Grpcpy.children.includes(target)) {
            grp = _this.ans2Grpcpy;
            grp2 = _this.ans1Grpcpy;
            grp1f = _this.ans2Grp.length;
            grp2f = _this.ans1Grp.length;
        }
        else if (_this.ans3Grpcpy.children.includes(target)) {
            grp = _this.ans3Grpcpy;
            grp2 = _this.ans4Grpcpy;
            grp1f = _this.ans3Grp.length;
            grp2f = _this.ans4Grp.length;
        }
        else if (_this.ans4Grpcpy.children.includes(target)) {
            grp = _this.ans4Grpcpy;
            grp2 = _this.ans3Grpcpy;
            grp1f = _this.ans4Grp.length;
            grp2f = _this.ans3Grp.length;
        }
        for (let k = Number(target.name); k < grp1f; k++) {

            grp.getChildAt(k).y = draggedCubey
            grp.getChildAt(k).x = draggedCubex + 20 * frontpos;
            frontpos++;

        }
        for (let k = Number(target.name) - 1; k >= 0; k--) {

            grp.getChildAt(k).y = draggedCubey;
            grp.getChildAt(k).x = draggedCubex - 20 * backpos;
            backpos++

        }
        var draggedCubex = target.x;
        var draggedCubey = target.y;
        var backpos = 1;
        var frontpos = 1;

        for (let k = Number(target.name); k < grp2f; k++) {
            if (grp2 == _this.ans1Grpcpy) {
                grp2.getChildAt(k).y = draggedCubey + 20;
            } else if (grp2 == _this.ans3Grpcpy && _this.ans3Grpcpys.getChildAt(0).y == 460) {
                grp2.getChildAt(k).y = draggedCubey + 20;
            }
            else if (grp2 == _this.ans4Grpcpy && _this.ans4Grpcpys.getChildAt(0).y == 460) {
                grp2.getChildAt(k).y = draggedCubey + 20;
            }
            else
                grp2.getChildAt(k).y = draggedCubey - 20;
            grp2.getChildAt(k).x = draggedCubex + 20 * frontpos - (grp.children.length * 20);
            frontpos++;

        }

        if (grp.length > 20 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(19).frame != 9) {
                framee = grp.getChildAt(9).frame;
                grp.getChildAt(19).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }
        else if (grp.length > 10 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(9).frame != 9) {
                framee = grp.getChildAt(9).frame;
                grp.getChildAt(9).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }


    },
    dragStopgrp: function (target) {
        if ((_this.ans1Grpcpy.children.includes(target) || _this.ans2Grpcpy.children.includes(target)) && !_this.checkOverlap(target, _this.AnsBox2) && _this.checkOverlap(target, _this.AnsBox)) {

            for (i = 0; i < _this.ans1Grp.length; i++) {
                box = _this.add.sprite(_this.ans1Grpcpys.getChildAt(_this.ans1Grpcpys.children.length - 1).x + 19, 400, 'allColor')
                box.frame = _this.ans1Grp.getChildAt(i).frame;
                _this.ans1Grpcpys.addChild(box);
            }
            for (i = 0; i < _this.ans2Grp.length; i++) {
                box = _this.add.sprite(_this.ans2Grpcpys.getChildAt(_this.ans2Grpcpys.children.length - 1).x + 19, 380, 'allColor')
                box.frame = _this.ans2Grp.getChildAt(i).frame;
                _this.ans2Grpcpys.addChild(box);
            }

            _this.borderBox11.destroy();
            _this.borderBox11 = _this.add.group();
            if (_this.ans1Grpcpys.length > 10 || _this.ans1Grpcpys.length > (_this.ans1Grpcpys.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.ans1Grpcpys.length - 1; q++) {
                    if ((_this.ans1Grpcpys.getChildAt(q).frame != _this.ans1Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grpcpys))) {

                        _this.makeRectBox(_this.ans1Grpcpys.getChildAt(q).frame + 1, 402, borderboxc);
                        borderboxc += (19 * (_this.ans1Grpcpys.getChildAt(q).frame + 1));
                        _this.borderBox11.addChild(_this.graphics);
                    }
                }
                _this.makeRectBox(_this.ans1Grpcpys.getChildAt(q).frame + 1, 402, borderboxc);
                _this.borderBox11.addChild(_this.graphics);
            }
            _this.borderBox21.destroy();
            _this.borderBox21 = _this.add.group();
            if (_this.ans2Grpcpys.length > 10 || _this.ans2Grpcpys.length > (_this.ans2Grpcpys.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.ans2Grpcpys.length - 1; q++) {
                    if ((_this.ans2Grpcpys.getChildAt(q).frame != _this.ans2Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grpcpys))) {
                        _this.makeRectBox(_this.ans2Grpcpys.getChildAt(q).frame + 1, 402 - 20, borderboxc);
                        borderboxc += (19 * (_this.ans2Grpcpys.getChildAt(q).frame + 1));
                        _this.borderBox21.addChild(_this.graphics);
                    }
                }
                _this.makeRectBox(_this.ans2Grpcpys.getChildAt(q).frame + 1, 402 - 20, borderboxc);
                _this.borderBox21.addChild(_this.graphics);
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();
        }
        else if ((_this.ans3Grpcpy.children.includes(target) || _this.ans4Grpcpy.children.includes(target)) && !_this.checkOverlap(target, _this.AnsBox2) && _this.checkOverlap(target, _this.AnsBox)) {

            for (i = 0; i < _this.ans3Grp.length; i++) {
                y = _this.ans3Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(_this.ans3Grpcpys.getChildAt(_this.ans3Grpcpys.children.length - 1).x + 19, y, 'allColor')
                box.frame = _this.ans3Grp.getChildAt(i).frame;
                _this.ans3Grpcpys.addChild(box);

            }
            for (i = 0; i < _this.ans4Grp.length; i++) {
                y = _this.ans4Grpcpys.getChildAt(0).y;
                box = _this.add.sprite(_this.ans4Grpcpys.getChildAt(_this.ans4Grpcpys.children.length - 1).x + 19, y, 'allColor')
                box.frame = _this.ans4Grp.getChildAt(i).frame;
                _this.ans4Grpcpys.addChild(box);

            }
            _this.borderBox31.destroy();
            _this.borderBox31 = _this.add.group();
            if (_this.ans3Grpcpys.length > 10 || _this.ans3Grpcpys.length > (_this.ans3Grpcpys.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.ans3Grpcpys.length - 1; q++) {
                    if ((_this.ans3Grpcpys.getChildAt(q).frame != _this.ans3Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grpcpys))) {
                        _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
                        borderboxc += (19 * (_this.ans3Grpcpys.getChildAt(q).frame + 1));
                        _this.borderBox31.addChild(_this.graphics);
                    }
                }
                _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 442 + 20, borderboxc);
                _this.borderBox31.addChild(_this.graphics);

            }
            _this.borderBox41.destroy();
            _this.borderBox41 = _this.add.group();
            if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (_this.ans4Grpcpys.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                    if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grpcpys))) {
                        _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
                        borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                        _this.borderBox41.addChild(_this.graphics);
                    }
                }
                _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 442, borderboxc);
                _this.borderBox41.addChild(_this.graphics);
            }
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();
        }
        _this.ans1Grpcpy.destroy();
        _this.ans2Grpcpy.destroy();
        _this.ans3Grpcpy.destroy();
        _this.ans4Grpcpy.destroy();
        _this.makeDraggableCubeGrp();
        _this.world.bringToTop(_this.borderBox21);
        _this.world.bringToTop(_this.borderBox11);
        _this.world.bringToTop(_this.borderBox41);
        _this.world.bringToTop(_this.borderBox31);

    },
    reArrangeScreen: function () {
        _this.AnsBox2.visible = false;
        _this.AnsBox.scale.setTo(1.01, 1.05);
        _this.RedeqtextBox.y -= 10;
        x = _this.ans1Grpcpys.children.length;
        y = _this.ans2Grpcpys.length;
        z = _this.ans3Grpcpys.length;
        t = _this.ans4Grpcpys.length;

        _this.ans1Grpcpys.destroy();
        _this.ans2Grpcpys.destroy();
        _this.ans3Grpcpys.destroy();
        _this.ans4Grpcpys.destroy();

        _this.ans1Grpcpys1 = _this.add.group();
        _this.ans2Grpcpys1 = _this.add.group();
        _this.ans4Grpcpys1 = _this.add.group();
        _this.ans3Grpcpys1 = _this.add.group();

        _this.ans1Grpcpys = _this.add.group();
        _this.ans2Grpcpys = _this.add.group();
        _this.ans4Grpcpys = _this.add.group();
        _this.ans3Grpcpys = _this.add.group();

        _this.ans1Grpcpy.destroy();
        _this.ans2Grpcpy.destroy();
        _this.ans3Grpcpy.destroy();
        _this.ans4Grpcpy.destroy();

        _this.borderBox11.destroy();
        _this.borderBox21.destroy();
        _this.borderBox31.destroy();
        _this.borderBox41.destroy();

        _this.borderBox1.destroy();
        _this.borderBox2.destroy();
        _this.borderBox3.destroy();
        _this.borderBox4.destroy();

        _this.ans4Grp.visible = false;
        _this.ans2Grp.visible = false;
        _this.ans3Grp.visible = false;
        _this.ans1Grp.visible = false;

        for (i = 0; i < x; i++) {
            box = _this.add.sprite(310 + i * 19, 219, 'allColor')
            box.frame = 10;
            _this.ans1Grpcpys1.addChild(box);
        }

        for (i = 0; i < y; i++) {
            box = _this.add.sprite(310 + i * 19, 199, 'allColor')
            box.frame = 10;

            _this.ans2Grpcpys1.addChild(box);
        }
        for (i = 0; i < t; i++) {
            box = _this.add.sprite(310 + i * 19, 300, 'allColor')
            box.frame = 10
            _this.ans3Grpcpys1.addChild(box);
        }
        for (i = 0; i < z; i++) {
            box = _this.add.sprite(310 + i * 19, 320, 'allColor')
            box.frame = 10;
            _this.ans4Grpcpys1.addChild(box);
        }

        _this.ans1Grpcpys1.visible = false
        _this.ans2Grpcpys1.visible = false;
        _this.ans3Grpcpys1.visible = false;
        _this.ans4Grpcpys1.visible = false

        _this.box1Display.destroy()
        _this.box2Display.destroy()
        _this.makeupperRodsGGrp(x, y, z, t);

        _this.textBox.visible = false;
        _this.time.events.add(500, _this.grayDenoms);

    },
    ansgrpCopyBorders: function (grp, x, y) {

        if (grp.length > 10 || grp.length > (grp.getChildAt(0).frame + 1)) {
            borderboxc = x;
            count = 0;
            currFrame = grp.getChildAt(0).frame;
            for (q = 0; q < grp.length - 1; q++) {
                if ((grp.getChildAt(q).frame != grp.getChildAt(q + 1).frame) || ((q + 1) % (grp.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(grp)) || (currFrame == count)) {
                    _this.makeRectBox(grp.getChildAt(q).frame + 1, y, borderboxc);
                    borderboxc += (19 * (grp.getChildAt(q).frame + 1));
                    if (grp == _this.ans1Grpcpys || grp == _this.ans1Grp) {
                        _this.borderBox11.addChild(_this.graphics);
                    }
                    else if (grp == _this.ans2Grpcpys || grp == _this.ans2Grp) {
                        _this.borderBox21.addChild(_this.graphics);
                    }
                    else if (grp == _this.ans3Grpcpys || grp == _this.ans3Grp) {
                        _this.borderBox31.addChild(_this.graphics);
                    }
                    else if (grp == _this.ans4Grpcpys || grp == _this.ans4Grp) {
                        _this.borderBox41.addChild(_this.graphics);
                    }
                }
                if (grp.getChildAt(q).frame != grp.getChildAt(q + 1).frame || currFrame == count) {
                    currFrame = grp.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(grp.getChildAt(q).frame + 1, y, borderboxc);
            if (grp == _this.ans1Grpcpys || grp == _this.ans1Grp) {
                _this.borderBox11.addChild(_this.graphics);
            }
            else if (grp == _this.ans2Grpcpys || grp == _this.ans2Grp) {
                _this.borderBox21.addChild(_this.graphics);
            }
            else if (grp == _this.ans3Grpcpys || grp == _this.ans3Grp) {
                _this.borderBox31.addChild(_this.graphics);
            }
            else if (grp == _this.ans4Grpcpys || grp == _this.ans4Grp) {
                _this.borderBox41.addChild(_this.graphics);
            }


        }
    },
    checkAllSameBoxes: function (grp) {
        for (m = 0; m < grp.length - 1; m++) {
            if (grp.getChildAt(m).frame != grp.getChildAt(m + 1).frame) {
                return false;
            }
        }
        return true;
    },
    makeupperRodsGGrp: function (x, y, z, t) {
        for (i = 0; i < x; i++) {
            box = _this.add.sprite(310 + i * 19, 219, 'allColor')
            box.frame = _this.ans1Grp.getChildAt(i % _this.ans1Grp.length).frame;
            _this.ans1Grpcpys.addChild(box);
        }

        for (i = 0; i < y; i++) {
            box = _this.add.sprite(310 + i * 19, 199, 'allColor')
            if (numer1[_this.count1] > 10) {
                if (i < y - Math.floor(y % 10))
                    box.frame = 9;
                else
                    box.frame = _this.ans2Grp.getChildAt(_this.ans2Grp.length - 1).frame;
            }
            else
                box.frame = _this.ans2Grp.getChildAt(i % _this.ans2Grp.length).frame;

            _this.ans2Grpcpys.addChild(box);
        }
        for (i = 0; i < z; i++) {
            box = _this.add.sprite(310 + i * 19, 320, 'allColor')
            if (numer2[_this.count1] > 10) {
                if (i < z - Math.floor(z % 10))
                    box.frame = 9;
                else
                    box.frame = _this.ans3Grp.getChildAt(_this.ans3Grp.length - 1).frame;
            }
            else
                box.frame = _this.ans3Grp.getChildAt(i % _this.ans3Grp.length).frame;
            _this.ans3Grpcpys.addChild(box);
        }
        for (i = 0; i < t; i++) {
            box = _this.add.sprite(310 + i * 19, 300, 'allColor')
            box.frame = _this.ans4Grp.getChildAt(i % _this.ans4Grp.length).frame;
            _this.ans4Grpcpys.addChild(box);
        }

        _this.borderBox11 = _this.add.group();
        _this.borderBox21 = _this.add.group();
        _this.borderBox31 = _this.add.group();
        _this.borderBox41 = _this.add.group();


        if (_this.ans1Grpcpys.length > 10 || _this.ans1Grpcpys.length > (_this.ans1Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans1Grpcpys.getChildAt(0).frame;
            for (q = 0; q < _this.ans1Grpcpys.length - 1; q++) {
                if ((_this.ans1Grpcpys.getChildAt(q).frame != _this.ans1Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans1Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans1Grpcpys)) || (currFrame == count)) {
                    _this.makeRectBox(_this.ans1Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
                    borderboxc += (19 * (_this.ans1Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox11.addChild(_this.graphics);

                }
                if (_this.ans1Grpcpys.getChildAt(q).frame != _this.ans1Grpcpys.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans1Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans1Grpcpys.getChildAt(q).frame + 1, 221, borderboxc);
            _this.borderBox11.addChild(_this.graphics);

        }
        if (_this.ans2Grpcpys.length > 10 || _this.ans2Grpcpys.length > (_this.ans2Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans2Grpcpys.getChildAt(0).frame;
            for (q = 0; q < _this.ans2Grpcpys.length - 1; q++) {
                if ((_this.ans2Grpcpys.getChildAt(q).frame != _this.ans2Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans2Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans2Grpcpys)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans2Grpcpys.getChildAt(q).frame + 1, 221 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans2Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox21.addChild(_this.graphics);

                }
                if (_this.ans2Grpcpys.getChildAt(q).frame != _this.ans2Grpcpys.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans2Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans2Grpcpys.getChildAt(q).frame + 1, 221 - 20, borderboxc);
            _this.borderBox21.addChild(_this.graphics);

        }

        if (_this.ans3Grpcpys.length > 10 || _this.ans3Grpcpys.length > (_this.ans3Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans3Grpcpys.getChildAt(0).frame;
            for (q = 0; q < _this.ans3Grpcpys.length - 1; q++) {
                if ((_this.ans3Grpcpys.getChildAt(q).frame != _this.ans3Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans3Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans3Grpcpys)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 322, borderboxc);
                    borderboxc += (19 * (_this.ans3Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox31.addChild(_this.graphics);

                }
                if (_this.ans3Grpcpys.getChildAt(q).frame != _this.ans3Grpcpys.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans3Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans3Grpcpys.getChildAt(q).frame + 1, 322, borderboxc);
            _this.borderBox31.addChild(_this.graphics);

        }
        if (_this.ans4Grpcpys.length > 10 || _this.ans4Grpcpys.length > (_this.ans4Grpcpys.getChildAt(0).frame + 1)) {
            borderboxc = 313;
            count = 0;
            currFrame = _this.ans4Grpcpys.getChildAt(0).frame;
            for (q = 0; q < _this.ans4Grpcpys.length - 1; q++) {
                if ((_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame) || ((q + 1) % (_this.ans4Grpcpys.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.ans4Grpcpys)) || (count == currFrame)) {
                    _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 322 - 20, borderboxc);
                    borderboxc += (19 * (_this.ans4Grpcpys.getChildAt(q).frame + 1));
                    _this.borderBox41.addChild(_this.graphics);

                }
                if (_this.ans4Grpcpys.getChildAt(q).frame != _this.ans4Grpcpys.getChildAt(q + 1).frame || count == currFrame) {
                    currFrame = _this.ans4Grpcpys.getChildAt(q + 1).frame;
                    count = 0;
                }
                else {
                    count++;
                }
            }
            _this.makeRectBox(_this.ans4Grpcpys.getChildAt(q).frame + 1, 322 - 20, borderboxc);
            _this.borderBox41.addChild(_this.graphics);

        }

    },
    validateRods: function (grp, val) {
        if (val <= 10) {
            for (i = 0; i < grp.length; i++) {
                if (grp.getChildAt(i).frame != ((val) - 1))
                    return false;
            }
            return true;
        }
        else {

            if (val < 20) {
                if (grp.getChildAt(0).frame == 9) {
                    for (i = 10; i < grp.length; i++) {
                        if (grp.getChildAt(i).frame != ((val % 10) - 1)) {
                            return false
                        }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (val == 20) {
                if (grp.getChildAt(0).frame == 9 && grp.getChildAt(10).frame == 9) {
                    return true
                }
                else return false;

            }
            else {
                if (grp.getChildAt(0).frame == 9) {
                    if (grp.getChildAt(10).frame == 9) {
                        for (i = 20; i < grp.length; i++) {
                            if (grp.getChildAt(i).frame != ((val % 10) - 1)) {
                                return false
                            }
                        }
                        return true;
                    }
                    else { return false }
                }
                else {
                    return false;
                }
            }
        }
    },
    rightbtnClicked: function () {
        _this.userselected = 0;
        _this.clickSound.play();
        _this.rightbtn.inputEnabled = false;
        _this.rightbtn.input.useHandCursor = false;
        _this.rightbtn_is_Clicked = true;

        if (_this.onebox == true) {
            _this.rightbtn.inputEnabled = false;
            if (_this.AnswerBox.name == "1") {
                _this.onebox = false;
                _this.counterCelebrationSound.play()
                _this.AnswerBox.destroy();
                _this.numGroup.destroy();
                _this.yellowBox2.visible = true;

                _this.yellowBox4 = _this.add.sprite(90 - 4, 51, 'yellowTextbox')
                _this.questionBox.addChild(_this.yellowBox4)
                _this.yellowBox4.visible = false;

                if (denom2[_this.count1] >= 10)
                    _this.d2 = _this.add.text(91 - 4, 52, denom2[_this.count1])
                else
                    _this.d2 = _this.add.text(99 - 4, 52, denom2[_this.count1])


                _this.questionBox.addChild(_this.d2)
                _this.applyingStyle(_this.d2);


                _this.rightbtn = _this.add.sprite(850, 70, 'TickBtn')
                _this.rightbtn.inputEnabled = true;
                _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this)
                _this.rightbtn.inputEnabled = true;


                _this.box1Display.visible = true;
                _this.firstFrac = true;
                if (numer1[_this.count1] >= 10)
                    _this.n11 = _this.add.text(6, 5, numer1[_this.count1])
                else
                    _this.n11 = _this.add.text(14, 5, numer1[_this.count1])

                _this.n11.scale.setTo(0.8)

                _this.box1Display.addChild(_this.n11)
                _this.applyingStyle(_this.n11);

                _this.hrSign1 = _this.add.graphics();
                _this.hrSign1.lineStyle(4, 0xFF0000);
                _this.hrSign1.moveTo(8, 30);
                _this.hrSign1.lineTo(30, 30);

                _this.box1Display.addChild(_this.hrSign1);

                if (denom1[_this.count1] >= 10)
                    _this.d11 = _this.add.text(8, 30, denom1[_this.count1])
                else
                    _this.d11 = _this.add.text(14, 30, denom1[_this.count1])

                _this.box1Display.addChild(_this.d11)
                _this.applyingStyle(_this.d11);
                _this.d11.scale.setTo(0.8)
                _this.d11.fill = '#FF0000';
                _this.n11.fill = '#FF0000';


                for (j = 0; j < 10; j++) {
                    _this.makeHrBoxes(10 - j, 'abcd')
                }

                _this.eraser.inputEnabled = true;
                _this.eraser.input.enableDrag(true);
                _this.eraser.events.onDragUpdate.add(_this.eraserUpdate, _this);
                _this.eraser.events.onDragStop.add(_this.eraserDrop, _this);
                _this.eraser.bringToTop();

            }
            else {
                _this.wrongans.play();
                _this.AnswerBox.removeChild(_this.enterTxt);
                _this.disableInputs();
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox2.visible == true) {
            _this.rightbtn.frame = 1;
            if (_this.ans1Grp.children.length == denom1[_this.count1] && _this.validateRods(_this.ans1Grp, denom1[_this.count1])) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox2.visible = false;
                _this.yellowBox.visible = true;
                _this.ans1Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;

                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.ans1Grp.destroy();
                _this.borderBox1.destroy();
                _this.ans1Grp = _this.add.group();
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox.visible == true) {
            _this.rightbtn.frame = 1;

            if (_this.ans2Grp.children.length == numer1[_this.count1] && _this.validateRods(_this.ans2Grp, numer1[_this.count1])) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox.visible = false;
                _this.yellowBox4.visible = true;
                _this.firstFrac = false;
                _this.ans2Grp.children.forEach(element => {
                    element.inputEnabled = false
                });

                _this.rightbtn.inputEnabled = true;
                _this.textBox = _this.add.sprite(260, 253, 'Text box_4')
                _this.plusSign(10, 16)
                _this.textBox.addChild(_this.pSign1);
                _this.textBox.addChild(_this.pSign2);
                _this.textBox.addChild(_this.pSign3);


                _this.box2Display = _this.add.sprite(260, 293, 'Text box_3')

                if (numer2[_this.count1] >= 10)
                    _this.n22 = _this.add.text(6, 5, numer2[_this.count1])
                else
                    _this.n22 = _this.add.text(14, 5, numer2[_this.count1])

                _this.n22.scale.setTo(0.8)

                _this.box2Display.addChild(_this.n22)
                _this.applyingStyle(_this.n22);

                _this.hrSign1 = _this.add.graphics();
                _this.hrSign1.lineStyle(4, 0xFF0000);
                _this.hrSign1.moveTo(8, 30);
                _this.hrSign1.lineTo(30, 30);

                _this.box2Display.addChild(_this.hrSign1);


                if (denom2[_this.count1] >= 10)
                    _this.d22 = _this.add.text(6, 30, denom2[_this.count1])
                else
                    _this.d22 = _this.add.text(14, 30, denom2[_this.count1])

                _this.box2Display.addChild(_this.d22)
                _this.applyingStyle(_this.d22);
                _this.d22.scale.setTo(0.8)
                _this.d22.fill = '#FF0000';
                _this.n22.fill = '#FF0000';
                _this.reCreatehrGrp();
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.borderBox2.destroy();
                _this.ans2Grp.destroy();
                _this.ans2Grp = _this.add.group();
                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox4.visible == true) {
            _this.rightbtn.frame = 1;

            if (_this.ans4Grp.children.length == denom2[_this.count1] && _this.validateRods(_this.ans4Grp, denom2[_this.count1])) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox4.visible = false;
                _this.yellowBox3.visible = true;
                _this.ans4Grp.children.forEach(element => {
                    element.inputEnabled = false
                });
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.rightbtn.inputEnabled = true;

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.ans4Grp.destroy();
                _this.borderBox4.destroy();

                _this.ans4Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.yellowBox3.visible == true) {
            _this.rightbtn.frame = 1;

            if (_this.ans3Grp.children.length == numer2[_this.count1] && _this.validateRods(_this.ans3Grp, numer2[_this.count1])) {
                _this.counterCelebrationSound.pause();
                _this.counterCelebrationSound.currentTime = 0;
                _this.counterCelebrationSound.play()
                _this.yellowBox3.visible = false;

                _this.ans3Grp.children.forEach(element => {
                    element.inputEnabled = false
                });
                _this.rightbtn.inputEnabled = true;
                _this.RedeqtextBox = _this.add.sprite(260, 410, 'Text box_4')
                _this.redeqSign = _this.add.text(12, 1, '=');
                _this.redeqSign.fill = '#FF0000'
                _this.RedeqtextBox.addChild(_this.redeqSign)

                _this.AnsBox2.visible = true;
                _this.time.events.add(500, () => {
                    _this.rightbtn.frame = 0;
                })
                _this.cubegrp = true;
                _this.AnsBox.scale.setTo(1.01, 1.25)
                _this.disableSidebar();
                _this.changeQuesBox();
                _this.rightbtn.destroy();

            }
            else {
                _this.wrongans.play();
                _this.rightbtn.frame = 0;
                _this.ans3Grp.destroy();
                _this.borderBox3.destroy();

                _this.ans3Grp = _this.add.group();

                _this.rightbtn.inputEnabled = true;
            }
        }
        else if (_this.finalPart == true) {

            if (_this.AnswerBox.name == valuesCombinationsNum[_this.count1] && _this.AnswerBox1.name == valuesCombinationsDenom[_this.count1]) {
                _this.part3 = false;
                _this.finalPart = false;
                _this.correctAns();
            }
            else {
                //edited for baseurl apk
                _this.noofAttempts++;

                _this.wrongAnsClicked()
                _this.rightbtn.inputEnabled = true;
            }
        }
    },
    makedisplayBox: function (x, y) {

        _this.AnswerBox.destroy();
        _this.AnswerBox1.destroy();
        _this.divideSign.destroy();

        _this.Display = _this.add.sprite(x, y, 'Text box_3')
        if (_this.part1 == true) {
            ans1 = _this.ans2Grpcpys.length;
            ans2 = _this.ans1Grpcpys.length;
        }
        else if (_this.part2 == true) {
            ans1 = _this.ans3Grpcpys.length
            ans2 = _this.ans4Grpcpys.length
        }

        if (ans1 >= 10)
            _this.n22 = _this.add.text(7, 5, ans1)
        else
            _this.n22 = _this.add.text(14, 5, ans1)

        _this.n22.scale.setTo(0.8)

        _this.Display.addChild(_this.n22)
        _this.applyingStyle(_this.n22);

        _this.hrSign1 = _this.add.graphics();
        _this.hrSign1.lineStyle(4, 0xFF0000);
        _this.hrSign1.moveTo(8, 30);
        _this.hrSign1.lineTo(30, 30);

        _this.Display.addChild(_this.hrSign1);


        if (ans2 >= 10)
            _this.d22 = _this.add.text(6, 30, ans2)
        else
            _this.d22 = _this.add.text(14, 30, ans2)

        _this.Display.addChild(_this.d22)
        _this.applyingStyle(_this.d22);
        _this.d22.scale.setTo(0.8)
        _this.d22.fill = '#FF0000';
        _this.n22.fill = '#FF0000';


        return _this.Display;
    },
    enableCubesDrag: function () {
        _this.finalAnsGrpDenom = _this.add.group();
        _this.finalAnsGrpNum = _this.add.group();
        _this.ans3Grpcpys.children.forEach(box => {
            box.inputEnabled = true;
            box.input.enableDrag(true);
            box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
            box.events.onDragStop.add(_this.dragStopRod, _this);
            box.events.onDragStart.add(_this.dragstartRod, _this);

        });
        _this.finalBorder = _this.add.group();
        _this.finalBorderD = _this.add.group();
    },
    dragstartRod: function (target) {
        _this.box22 = false;
        if (_this.ans1Grpcpys.children.includes(target)) {
            _this.ans1Grpcpys1.visible = true
            _this.borderBox11.destroy();
        }
        else if (_this.ans2Grpcpys.children.includes(target)) {
            _this.ans2Grpcpys1.visible = true
            _this.box22 = true;
            _this.borderBox21.destroy();

        }
        else if (_this.ans3Grpcpys.children.includes(target)) {
            _this.ans4Grpcpys1.visible = true
            _this.borderBox31.destroy();
        }
        else if (_this.ans4Grpcpys.children.includes(target)) {
            _this.ans3Grpcpys1.visible = true
            _this.borderBox41.destroy();
        }
    },
    dragUpdateRod: function (target) {
        target.bringToTop();
        var frontpos = 1;
        var backpos = 1;
        var draggedCubex = target.x;
        var draggedCubey = target.y;
        if (_this.ans1Grpcpys.children.includes(target)) {
            grp = _this.ans1Grpcpys
        }
        else if (_this.ans2Grpcpys.children.includes(target)) {
            grp = _this.ans2Grpcpys

        }
        else if (_this.ans3Grpcpys.children.includes(target)) {
            grp = _this.ans3Grpcpys;

        }
        else if (_this.ans4Grpcpys.children.includes(target)) {
            grp = _this.ans4Grpcpys;

        }

        for (let k = Number(target.name); k < grp.length; k++) {

            grp.getChildAt(k).y = draggedCubey
            grp.getChildAt(k).x = draggedCubex + 19 * frontpos;
            frontpos++;

        }


        if (grp.length > 20 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(19).frame != 9) {
                framee = grp.getChildAt(19).frame;
                grp.getChildAt(19).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }
        else if (grp.length > 10 && grp.getChildAt(0).frame == 9) {
            if (grp.getChildAt(9).frame != 9) {
                framee = grp.getChildAt(9).frame;
                grp.getChildAt(9).frame = 9;
                grp.getChildAt(grp.length - 1).frame = framee
            }
        }

    },
    dragStopRod: function (target) {

        if (_this.ans3Grpcpys.children.includes(target)) {
            x = _this.ans4Grpcpys1.length;
            for (i = 0; i < x; i++) {
                box = _this.add.sprite(310 + i * 19, 415, 'allColor')
                box.frame = _this.ans3Grpcpys.getChildAt(0).frame;
                _this.finalAnsGrpDenom.addChild(box);
            }

            if (_this.ans3Grpcpys.children.includes(target)) {
                _this.ans3Grpcpys.destroy();
            }
            _this.finalBorderD.destroy();
            count = 0;
            currFrame = _this.finalAnsGrpDenom.getChildAt(0).frame;
            _this.finalBorderD = _this.add.group();
            if (_this.finalAnsGrpDenom.length > 10 || _this.finalAnsGrpDenom.length > (_this.finalAnsGrpDenom.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.finalAnsGrpDenom.length - 1; q++) {
                    if ((_this.finalAnsGrpDenom.getChildAt(q).frame != _this.finalAnsGrpDenom.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpDenom.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpDenom)) || (count == currFrame)) {
                        _this.makeRectBox(_this.finalAnsGrpDenom.getChildAt(q).frame + 1, 419, borderboxc);
                        borderboxc += (19 * (_this.finalAnsGrpDenom.getChildAt(q).frame + 1));
                        _this.finalBorderD.addChild(_this.graphics);
                    }
                    if (_this.finalAnsGrpDenom.getChildAt(q).frame != _this.finalAnsGrpDenom.getChildAt(q + 1).frame || count == currFrame) {
                        currFrame = _this.finalAnsGrpDenom.getChildAt(q + 1).frame;
                        count = 0;
                    }
                    else {
                        count++;
                    }
                }
                _this.makeRectBox(_this.finalAnsGrpDenom.getChildAt(q).frame + 1, 419, borderboxc);
                _this.finalBorderD.addChild(_this.graphics);

            }
            _this.world.bringToTop(_this.finalBorderD);

            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();

        }
        else {
            x = 310;
            if (_this.ans2Grpcpys.children.includes(target)) {
                for (i = 0; i < _this.ans2Grpcpys1.length; i++) {
                    box = _this.add.sprite(x + i * 19, 395, 'allColor')
                    box.frame = _this.ans2Grpcpys.getChildAt(i).frame;
                    _this.finalAnsGrpNum.addChild(box);
                }
                _this.ans2Grpcpys.destroy();
            }

            count = 0;
            currFrame = _this.finalAnsGrpNum.getChildAt(0).frame;
            _this.finalBorder.destroy();
            _this.finalBorder = _this.add.group();
            if (_this.finalAnsGrpNum.length > 10 || _this.finalAnsGrpNum.length > (_this.finalAnsGrpNum.getChildAt(0).frame + 1)) {
                borderboxc = 313;
                for (q = 0; q < _this.finalAnsGrpNum.length - 1; q++) {
                    if ((_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame) || ((q + 1) % (_this.finalAnsGrpNum.getChildAt(q).frame + 1) == 0 && _this.checkAllSameBoxes(_this.finalAnsGrpNum)) || (count == currFrame)) {
                        _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 419 - 20, borderboxc);
                        borderboxc += (19 * (_this.finalAnsGrpNum.getChildAt(q).frame + 1));
                        _this.finalBorder.addChild(_this.graphics);
                    }
                    if (_this.finalAnsGrpNum.getChildAt(q).frame != _this.finalAnsGrpNum.getChildAt(q + 1).frame || count == currFrame) {
                        currFrame = _this.finalAnsGrpNum.getChildAt(q + 1).frame;
                        count = 0;
                    }
                    else {
                        count++;
                    }
                }
                _this.makeRectBox(_this.finalAnsGrpNum.getChildAt(q).frame + 1, 419 - 20, borderboxc);
                _this.finalBorder.addChild(_this.graphics);

            }
            _this.world.bringToTop(_this.finalBorder);
            _this.snapSound.pause();
            _this.snapSound.currentTime = 0;
            _this.snapSound.play();

        }
        if (_this.finalAnsGrpDenom.length == valuesCombinationsDenom[_this.count1] && _this.ans3Grpcpys.length == 0) {

            if (_this.finalAnsGrpNum.length == valuesCombinationsNum[_this.count1]) {
                _this.addNumberPad();
                _this.finalPart = true;
                _this.questionBox2.destroy();
                _this.yelloBox5.destroy();
                _this.pSign1.destroy();
                _this.pSign2.destroy();
                _this.pSign3.destroy();
                _this.blueeqsign.destroy();
                _this.changeQuesBox();

            }
            else {
                _this.ans2Grpcpys.children.forEach(box => {
                    box.inputEnabled = true;
                    box.input.enableDrag(true);
                    box.events.onDragUpdate.add(_this.dragUpdateRod, _this);
                    box.events.onDragStop.add(_this.dragStopRod, _this);
                    box.events.onDragStart.add(_this.dragstartRod, _this);

                });
            }
        }
    },
    hrLine: function (x, y) {
        _this.hrSign1 = _this.add.graphics();
        _this.hrSign1.lineStyle(4, 0x65B4C3);
        _this.hrSign1.moveTo(x - 1, y);
        _this.hrSign1.lineTo(x + 35, y);

    },
    plusSignBlue: function (x, y) {
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0x65B4C3);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 18, y);

        _this.pSign2 = _this.add.graphics();
        _this.pSign2.lineStyle(4, 0x65B4C3);
        _this.pSign2.moveTo(x + 7, y - 9);
        _this.pSign2.lineTo(x + 11, y - 9);

        _this.pSign3 = _this.add.graphics();
        _this.pSign3.lineStyle(4, 0x65B4C3);
        _this.pSign3.moveTo(x + 7, y + 9);
        _this.pSign3.lineTo(x + 11, y + 9);


    },
    plusSign: function (x, y) {
        _this.pSign1 = _this.add.graphics();
        _this.pSign1.lineStyle(4, 0xFF0000);
        _this.pSign1.moveTo(x, y);
        _this.pSign1.lineTo(x + 18, y);

        _this.pSign2 = _this.add.graphics();
        _this.pSign2.lineStyle(4, 0xFF0000);
        _this.pSign2.moveTo(x + 7, y - 7);
        _this.pSign2.lineTo(x + 11, y - 7);

        _this.pSign3 = _this.add.graphics();
        _this.pSign3.lineStyle(4, 0xFF0000);
        _this.pSign3.moveTo(x + 7, y + 7);
        _this.pSign3.lineTo(x + 11, y + 7);

    },
    makeRectBox: function (x, y, z) {
        _this.graphics = _this.add.graphics();
        _this.graphics.lineStyle(3, 0x000000,);
        _this.graphics.drawRect(z, y, 19 * x, 20);
    },
    wrongAnsClicked: function () {
        _this.wrongans.play();
        _this.AnswerBox.removeChild(_this.enterTxt);
        _this.AnswerBox.frame = 0;
        _this.q2 = true;
        _this.q1 = false;
        _this.AnswerBox1.removeChild(_this.enterTxt1);
        _this.AnswerBox1.frame = 1;
        _this.disableInputs();
        _this.removeboth = false;

    },
    addNumberPad: function () {

        _this.objGroup = _this.add.group();
        _this.numGroup = _this.add.group();

        var bottomnumpadbg = _this.numGroup.create(0, 515, 'numpadbg');
        //bottomnumpadbg.anchor.setTo(0.5);
        bottomnumpadbg.scale.setTo(1, 1);

        // bottomnumpadbg.name = "numpadbg";

        _this.x = 40;
        // set the number pad invisible initially. only after tweening it is made visible
        _this.numGroup.visible = false;

        for (var i = 0; i < 10; i++) {
            _this.numbg = _this.numGroup.create(_this.x, 552, 'Numberpad');
            _this.numbg.anchor.setTo(0.5);
            // _this.numbg.scale.setTo(0.9);
            _this.numbg.name = i + 1;
            _this.numbg.frame = i;

            _this.numbg.inputEnabled = true;
            _this.numbg.input.useHandCursor = true;
            _this.numbg.events.onInputDown.add(_this.numClicked, _this);

            _this.x += 73;
        }

        _this.wrongbtn = _this.numGroup.create(_this.x + 10, 552, 'Numberpad');
        _this.wrongbtn.frame = 11;
        _this.wrongbtn.anchor.setTo(0.5);
        // _this.wrongbtn.scale.setTo(0.8, 0.8);
        _this.wrongbtn.name = "wrongbtn";
        _this.wrongbtn.inputEnabled = true;
        _this.wrongbtn.input.useHandCursor = true;
        _this.wrongbtn.events.onInputDown.add(_this.wrongbtnClicked, _this);

        _this.rightbtn = _this.numGroup.create(_this.x + 80, 552, 'Numberpad');
        _this.rightbtn.frame = 12;
        _this.rightbtn.anchor.setTo(0.5);
        // _this.rightbtn.scale.setTo(0.8, 0.8);
        _this.rightbtn.name = "rightbtn";
        _this.rightbtn.inputEnabled = true;
        _this.rightbtn.input.useHandCursor = true;
        _this.rightbtn.events.onInputDown.add(_this.rightbtnClicked, _this);

        _this.enterTxt = _this.add.text(8, 8, "");
        _this.enterTxt.anchor.setTo(0.5);
        _this.enterTxt.align = 'center';
        _this.enterTxt.font = "Akzidenz-Grotesk BQ";
        _this.enterTxt.fontSize = "30px";
        _this.enterTxt.fontWeight = 'normal';
        _this.enterTxt.fill = '#65B4C3';

        //_this.objGroup.add(_this.ScreenTextBox);
        _this.numpadTween = _this.add.tween(_this.numGroup);

        //_this.ScreenTextTween = _this.add.tween(_this.ScreenTextBox);

        //tween in the number pad after a second.
        //_this.time.events.add(100, _this.tweenNumPad);
        _this.tweenNumPad();

        //after 2 seconds, show the screen text box as enabled
        //_this.time.events.add(2000, _this.enableScreenText);

    },
    wrongbtnClicked: function (target) {

        _this.clickSound.play();
        _this.fourNotEntered = false;

        if (_this.onebox == true) {
            _this.AnswerBox.removeChild(_this.enterTxt);
            _this.AnswerBox.name = "";
            _this.enterTxt = ""
        }
        else if (_this.AnswerBox.frame == 1) {
            _this.AnswerBox.removeChild(_this.enterTxt);
            _this.q1 = true;
            _this.AnswerBox.name = "";
            _this.enterTxt = ""
        }
        else {
            _this.AnswerBox1.removeChild(_this.enterTxt1);
            _this.q2 = true;
            _this.AnswerBox1.name = "";
            _this.enterTxt1 = ""

        }

        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = '';

    },
    disableInputs: function () {
        _this.selectedAns1 = '';
        _this.selectedAns2 = '';
        _this.selectedAns3 = ''
        _this.AnswerBox.name = '';
        if (!_this.onebox) {
            _this.AnswerBox1.name = '';
            _this.enterTxt1 = '';
        }

        _this.enterTxt = '';
        _this.fourNotEntered = false;

    },
    numClicked: function (target) {
        _this.clickSound.play();
        var_selectedAns1 = " "
        var_selectedAns2 = " "
        var_selectedAns3 = " "
        if (target.name == 10) {
            target.name = '0'
            _this.signNotselected = true;
        }

        if (_this.selectedAns1 === '') {
            _this.selectedAns1 = target.name;
            var_selectedAns1 = _this.selectedAns1;

        }
        else if (_this.selectedAns2 === '') {

            _this.selectedAns2 = target.name;
            var_selectedAns1 = _this.selectedAns1;
            var_selectedAns2 = _this.selectedAns2;


        }
        if (target.name == '0')
            target.name = 10;

        if (_this.fourNotEntered == false) {

            if (_this.q1 == true) {
                _this.enterTxt.visible = false;
                _this.AnswerBox.removeChild(_this.enterTxt);
                if ((var_selectedAns2 === " "))

                    _this.enterTxt = _this.add.text(19, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });

                else if ((var_selectedAns3 === " ")) {
                    _this.enterTxt = _this.add.text(14, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                    _this.q1 = false;
                    _this.fourNotEntered = true
                }

                _this.enterTxt.scale.setTo(1, 1.4)

                _this.applyingStyle(_this.enterTxt);
                _this.AnswerBox.addChild(_this.enterTxt);
                _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2);
            }

            else if (_this.q2 == true) {
                _this.AnswerBox1.removeChild(_this.enterTxt1);
                if ((var_selectedAns2 === " "))

                    _this.enterTxt1 = _this.add.text(19, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                else if ((var_selectedAns3 === " ")) {
                    _this.enterTxt1 = _this.add.text(14, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                    _this.q2 = false;
                    _this.fourNotEntered = true
                }


                _this.enterTxt1.scale.setTo(1, 1.4)

                _this.applyingStyle(_this.enterTxt1);

                _this.AnswerBox1.addChild(_this.enterTxt1);
                _this.AnswerBox1.name = Number('' + var_selectedAns1 + var_selectedAns2);
            }

            else {
                _this.enterTxt.visible = false;
                _this.AnswerBox.removeChild(_this.enterTxt);
                if ((var_selectedAns2 === " "))
                    _this.enterTxt = _this.add.text(19, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });

                else if ((var_selectedAns3 === " ")) {
                    _this.enterTxt = _this.add.text(10, 8, "" + var_selectedAns1 + var_selectedAns2, { fontSize: '20px' });
                    _this.fourNotEntered = true
                }
                _this.enterTxt.scale.setTo(1.5)
                _this.applyingStyle(_this.enterTxt);
                _this.AnswerBox.addChild(_this.enterTxt);
                _this.AnswerBox.name = Number('' + var_selectedAns1 + var_selectedAns2);
            }
        }

    },
    tweenNumPad: function () {
        _this.numGroup.visible = true;
        _this.numpadTween.to({ x: 0, y: -43 }, 1000, 'Linear', true, 0);

    },
    ClearAll: function () {

        _this.disableInputs()
        _this.ans1Grpcpys1.destroy();
        _this.ans2Grpcpys1.destroy();
        _this.ans3Grpcpys1.destroy();
        _this.ans4Grpcpys1.destroy();
        _this.AnswerBox.destroy();
        _this.AnswerBox1.destroy();
        _this.questionBox2.destroy();
        _this.finalAnsGrpDenom.destroy();
        _this.finalAnsGrpNum.destroy();
        _this.AnsBox.destroy();
        _this.AnsBox2.destroy();
        _this.sideGray.destroy();
        _this.box1Display.destroy();
        _this.box2Display.destroy();
        _this.textBox.destroy();
        _this.RedeqtextBox.destroy();
        _this.numGroup.destroy();
        _this.yelloBox5.destroy();
        _this.pSign1.destroy();
        _this.pSign2.destroy();
        _this.pSign3.destroy();
        _this.blueeqsign.destroy();
        _this.eraser.destroy();
        _this.finalBorder.destroy();
        _this.finalBorderD.destroy();
        _this.fourNotEntered = true;
        _this.q1 = false;
        _this.q2 = false;

    },
    checkOverlap: function (spriteA, spriteB) {
        _this.boundsA = spriteA.getBounds();
        _this.boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(_this.boundsA, _this.boundsB);
    },
    applyingStyle: function (target) {
        target.align = 'right';
        target.font = "Akzidenz-Grotesk BQ";
        target.fill = '#65B4C3';
        target.fontWeight = 'normal';
        target.visible = true;
    },
    correctAns: function () {

        if (_this.count1 < 5) {
            //edited for baseurl apk
            _this.noofAttempts++;
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            //..............

            console.log(_this.noofAttempts, "_this.noofAttempts.................");
            console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
            console.log(_this.sceneCount, "_this.sceneCount.................");
            console.log(_this.questionid, "_this.questionid.................");


            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(3000, _this.MakeSideBar);

        }
        else {
            //edited for baseurl apk
            _this.noofAttempts++;
            telInitializer.tele_saveAssessment(_this.questionid, "yes", _this.AnsTimerCount, _this.noofAttempts, _this.sceneCount);
            //..............

            console.log(_this.noofAttempts, "_this.noofAttempts.................");
            console.log(_this.AnsTimerCount, "_this.AnsTimerCount.................");
            console.log(_this.sceneCount, "_this.sceneCount.................");
            console.log(_this.questionid, "_this.questionid.................");


            _this.celebrationSound.play();
            _this.starActions(_this.count1);
            _this.time.events.add(2000, _this.ClearAll);
            _this.time.events.add(2500, () => {
                _this.state.start('score', true, false, gameID, _this.microConcepts);
            })
        }
    },
    starActions: function (target) {
        //edited for baseurl apk
        _this.AnsTimerCount = 0;//total time
        _this.microConcepts = "Number SystemsG7";

        starAnim = _this.starsGroup.getChildAt(_this.count1);
        starAnim.smoothed = false;
        anim = starAnim.animations.add('star');
        _this.count1++;
        anim.play();
    },


    shutdown: function () {
        _this.stopVoice();
        //RI.gotoEndPage();
        //telInitializer.tele_end();
    },

    DemoVideo: function () {
        // DEMO AUDIOS
        //* how many 2/3rds are there in 2?
        _this.demoAudio1 = document.createElement('audio');
        _this.demoAudio1src = document.createElement('source');
        _this.demoAudio1src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d1.mp3");
        _this.demoAudio1.appendChild(_this.demoAudio1src);

        //* if any number is whole number then first change whole number in to fraction
        _this.demoAudio2 = document.createElement('audio');
        _this.demoAudio2src = document.createElement('source');
        _this.demoAudio2src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d2.mp3");
        _this.demoAudio2.appendChild(_this.demoAudio2src);

        //* Place the cuisenaire rods for the first  number
        _this.demoAudio3 = document.createElement('audio');
        _this.demoAudio3src = document.createElement('source');
        _this.demoAudio3src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d3.mp3");
        _this.demoAudio3.appendChild(_this.demoAudio3src);

        //*  Place the cuisenaire rods for the second  number
        _this.demoAudio4 = document.createElement('audio');
        _this.demoAudio4src = document.createElement('source');
        _this.demoAudio4src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d4.mp3");
        _this.demoAudio4.appendChild(_this.demoAudio4src);

        //*  To compare both number’s denominators, use Flip button to flip the 2nd number
        _this.demoAudio5 = document.createElement('audio');
        _this.demoAudio5src = document.createElement('source');
        _this.demoAudio5src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d5.mp3");
        _this.demoAudio5.appendChild(_this.demoAudio5src);


        //*  Add number sets such that both denominators get equalised
        _this.demoAudio6 = document.createElement('audio');
        _this.demoAudio6src = document.createElement('source');
        _this.demoAudio6src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d6.mp3");
        _this.demoAudio6.appendChild(_this.demoAudio6src);

        //* Drag and place numerator of second number as denominator of the answer 
        _this.demoAudio7 = document.createElement('audio');
        _this.demoAudio7src = document.createElement('source');
        _this.demoAudio7src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d7.mp3");
        _this.demoAudio7.appendChild(_this.demoAudio7src);

        //* Drag and place numerator of first number as numerator of the answer 
        _this.demoAudio8 = document.createElement('audio');
        _this.demoAudio8src = document.createElement('source');
        _this.demoAudio8src.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" + _this.languageSelected + "/NSF_DIV_01_G7_d8.mp3");
        _this.demoAudio8.appendChild(_this.demoAudio8src);


        // QUESTION AUDIOS
        //*  Divide the fraction 
        _this.q1Sound = document.createElement('audio');
        _this.q1Soundsrc = document.createElement('source');
        _this.q1Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" +
            _this.languageSelected + "/NSF_DIV_01_G7_a1.mp3");
        _this.q1Sound.appendChild(_this.q1Soundsrc);

        //* enter the answer
        _this.q2Sound = document.createElement('audio');
        _this.q2Soundsrc = document.createElement('source');
        _this.q2Soundsrc.setAttribute("src", window.baseUrl + "questionSounds/NSF-DFW-G7/" +
            _this.languageSelected + "/NSF_DIV_01_G7_a2.mp3");
        _this.q2Sound.appendChild(_this.q2Soundsrc);


        _this.video_playing = 0;
        _this.showDemoVideo();  //* call the function to show the video

        //* skip button shown at the bottom when clicked dlete all the demo vedio added will be deleted also the sudis will be stopped
        //* skip btn will be deleted
        _this.skip = _this.add.image(870, 390, 'skipArrow');       //* skip button shown at the bottom
        _this.skip.inputEnabled = true;
        _this.skip.input.useHandCursor = true;
        _this.skip.events.onInputDown.add(function () {
            _this.stopAudio();

            if (_this.demoVideo_1)
                _this.demoVideo_1.stop(false);
            if (_this.videoWorld_1)
                _this.videoWorld_1.destroy();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }
            _this.game.paused = false;  //* restart the game
        });
    },

    stopAudio: function () {
        //* clear all the timers first

        if (_this.demoAudio3Timer) clearTimeout(_this.demoAudio3Timer);
        if (_this.q2Timer) clearTimeout(_this.q2Timer);

        if (_this.demoAudio1) {
            console.log("removing the demo audio1");
            _this.demoAudio1.pause();
            _this.demoAudio1 = null;
            _this.demoAudio1src = null;
        }

        if (_this.demoAudio2) {
            console.log("removing the demo audio2");
            _this.demoAudio2.pause();
            _this.demoAudio2 = null;
            _this.demoAudio2src = null;
        }

        if (_this.demoAudio3) {
            console.log("removing the demo audio3");
            _this.demoAudio3.pause();
            _this.demoAudio3 = null;
            _this.demoAudio3src = null;
        }

        if (_this.demoAudio4) {
            console.log("removing the demo audio4");
            _this.demoAudio4.pause();
            _this.demoAudio4 = null;
            _this.demoAudio4src = null;
        }

        if (_this.demoAudio5) {
            console.log("removing the demo audio5");
            _this.demoAudio5.pause();
            _this.demoAudio5 = null;
            _this.demoAudio5src = null;
        }

        if (_this.demoAudio6) {
            console.log("removing the demo audio6");
            _this.demoAudio6.pause();
            _this.demoAudio6 = null;
            _this.demoAudio6src = null;
        }

        if (_this.demoAudio7) {
            console.log("removing the demo audio7");
            _this.demoAudio7.pause();
            _this.demoAudio7 = null;
            _this.demoAudio7src = null;
        }

        if (_this.demoAudio8) {
            console.log("removing the demo audio8");
            _this.demoAudio8.pause();
            _this.demoAudio8 = null;
            _this.demoAudio8src = null;
        }


        if (_this.q1Sound) {
            console.log("removing the q1");
            _this.q1Sound.pause();
            _this.q1Sound = null;
            _this.q1Soundsrc = null;
        }

        if (_this.q2Sound) {
            console.log("removing the q2");
            _this.q2Sound.pause();
            _this.q2Sound = null;
            _this.q2Soundsrc = null;
        }


        _this.skip.events.onInputDown.removeAll();
        _this.skip.destroy();                //* skip button destroyed

    },

    q1S: function () {
        console.log("inside q1S.....")
        _this.demoAudio1.play();
    },

    dA1: function () {
        console.log("inside dA1.....")
        _this.demoVideo_1.playbackRate = 1;
        _this.demoAudio2.play();
        _this.demoAudio2.addEventListener('ended', _this.dA2);

    },

    dA2: function () {
        console.log("inside demo auido 3.....")
        _this.demoAudio2Timer = setTimeout(function ()    //* demo audio3 js timer to play demo audio2 after 3 seconds.
        {
            console.log("inside demoau3sound.....")
            clearTimeout(_this.demoAudio2Timer);
            _this.demoAudio3.play();        //* clear the time once its used.
        }, 3000);

        _this.demoAudio3.addEventListener('ended', _this.dA3);

    },

    dA3: function () {
        _this.demoAudio3Timer = setTimeout(function ()    //* demo audio3 js timer to play demo audio2 after 6 seconds.
        {
            console.log("inside demoau3sound.....")
            clearTimeout(_this.demoAudio3Timer);
            _this.demoAudio4.play();        //* clear the time once its used.
        }, 6000);
        _this.demoAudio4.addEventListener('ended', _this.dA4);

    },

    dA4: function () {
        _this.demoAudio4Timer = setTimeout(function ()    //* demo audio3 js timer to play demo audio2 after 6 seconds.
        {

            console.log("inside demoau5sound.....")
            _this.demoVideo_1.playbackRate = 0;
            clearTimeout(_this.demoAudio4Timer);
            _this.demoAudio5.play();        //* clear the time once its used.
        }, 6000);
        _this.demoAudio5.addEventListener('ended', _this.dA5);
    },

    dA5: function () {
        console.log("inside demoauddio6sound.....")
        _this.demoAudio6.play();
        _this.demoAudio6.addEventListener('ended', _this.dA6);

    },

    dA6: function () {
        console.log("resume video.....")
        _this.demoVideo_1.playbackRate = 1;

    },

    dA8: function () {
        _this.q2Timer = setTimeout(function ()    //* q2 js timer to play q2 after 5 mili seconds.
        {
            console.log("inside q2sound.....")
            clearTimeout(_this.q2Timer);         //* clear the time once its used.
            _this.q2Sound.play();
        }, 500)
    },

    showDemoVideo: function () {

        _this.demoVideo_1 = _this.add.video('nsfdfw');
        _this.demoVideo_1.play(false);
        _this.demoVideo_1.changeSource(window.baseUrl + "assets/demoVideos/NSF-DFW-G7.mp4");
        _this.video_playing = 1;
        _this.videoWorld_1 = _this.demoVideo_1.addToWorld();

        _this.demoVideo_1.playbackRate = 0;
        _this.q1Sound.play();

        _this.q1Sound.addEventListener('ended', _this.q1S);
        _this.demoAudio1.addEventListener('ended', _this.dA1);

        _this.demoAudio7Timer = setTimeout(function ()    //* demo audio3 js timer to play demo audio2 after 5 seconds.
        {
            console.log("inside demoau7sound.....")
            clearTimeout(_this.demoAudio7Timer);
            _this.demoAudio7.play();        //* clear the time once its used.
        }, 50000);

        _this.demoAudio8Timer = setTimeout(function ()    //* demo audio3 js timer to play demo audio2 after 59 seconds.
        {
            console.log("inside demoau8sound.....")
            clearTimeout(_this.demoAudio8Timer);
            _this.demoAudio8.play();        //* clear the time once its used.
        }, 59000);
        _this.demoAudio8.addEventListener('ended', _this.dA8);

        _this.demoVideo_1.onComplete.add(function () {

            _this.stopAudio();  //* stop all the audios
            _this.demoVideo_1.stop(false);
            _this.videoWorld_1.destroy();

            if (_this.hintBtn) {
                _this.hintBtn.inputEnabled = true;
                _this.hintBtn.input.useHandCursor = true;
            }
            _this.game.paused = false;

        });
    }
}