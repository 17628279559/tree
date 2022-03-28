<template>
  <div class="container">
    <div class="p5Canvas"></div>
  </div>
</template>

<script>
import P5 from 'p5';

export default {
  data () {
    return {
      p5Canvas: null,
    }
  },
  created () {
    const sketch = p5 => {
      var lsilder, rsilder, len_slider;
      var PI = 3.1415926;
      var maxLevel = 12;
      var langle, rangle, len;
      let w = 1074;
      let h = 600;

      // let w = window.innerWidth;
      // let h = window.innerHeight;

      p5.setup = () => {
        p5.createCanvas(w, h);
        lsilder = p5.createSlider(0, PI, PI / 5, 0.01);
        lsilder.position(240, 160);
        rsilder = p5.createSlider(0, PI, PI / 5, 0.01);
        rsilder.position(240, 185);
        len_slider = p5.createSlider(150, 250, 200, 1);
        len_slider.position(240, 210);
      };

      p5.draw = () => {
        p5.background(60, 60, 60);
        langle = lsilder.value();
        rangle = rsilder.value();
        len = len_slider.value();
        p5.stroke(255);
        p5.translate(w / 2, h);
        p5.scale(1, -1);
        p5.translate(0, 20);
        p5.branch(1, len);
      };

      // create methods:
      p5.branch = (level, len) => {
        p5.strokeWeight(10 * Math.pow((maxLevel - level + 1) / maxLevel, 2));
        p5.line(0, 0, 0, len);
        p5.translate(0, len);
        if (len > 4) {
          p5.push();
          p5.rotate(langle);
          p5.branch(level + 1, len * 0.67);
          p5.pop();
          p5.push();
          p5.rotate(-rangle);
          p5.branch(level + 1, len * 0.67);
          p5.pop();
        }
      }
    }

    this.p5Canvas = new P5(sketch, 'p5Canvas');
  },
  unmounted () {
    this.p5Canvas = null;
  },
}
</script>

<style>
#p5Canvas {
  width: 100vw;
  position: relative;
}
canvas {
  margin: auto;
}

main {
  margin: 0 auto;
  width: 90vw;
}
</style>