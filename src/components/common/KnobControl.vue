<template>
    <div class="knob-control" :style="{ height: size + 'px' }" >
        <svg  viewBox="0 0 100 100" style="margin:0 auto;width: 100%;height: auto;"  @click="onClick"
			 @mousedown="onMouseDown"
			 @mouseup="onMouseUp"
			 @touchstart="onTouchStart"
			 @touchend="onTouchEnd" > 
			 <defs>
				<linearGradient id="Linear" x1="0%" y1="0%" x2="100%" y2="0%">
					  <stop offset="0%" style="stop-color:#F5d94d;stop-opacity:0.7" />
					  <stop offset="100%" style="stop-color:#F85d56;stop-opacity:0.8" />
				</linearGradient>
			  </defs>
			  <g>
					<path
					   :d="rangePath"
					   :stroke-width="strokeWidth"
					   stroke="#DFDFDF"
					   class="knob-control__range"
					   stroke-linecap="round">
					</path>
					<path 
					   v-if="showValue"
					   :d="valuePath"
					   :stroke-width="strokeWidth"
					   stroke="url(#Linear)" 
					   class="knob-control__value"
					   stroke-linecap="round">
					</path>
					<!-- <circle :cx="cirx"  :cy="ciry"  r="5"  fill="#fff" stroke-width="4" stroke=" #F85d56" /> -->
			  </g>
			    <text
				  :x="50"
				  :y="32"
				  fill="#bebebe"
				  text-anchor="middle"
				  class="knob-control__text-title">
				  借款金额
				</text>
				<text
				  v-if="showValue"
				  :x="50"
				  :y="45"
				  text-anchor="middle"
				  :fill="textColor"
				  class="knob-control__text-display">
				  {{valueDisplay}}
				</text>
        </svg>
    </div>
</template>

<script>
    const RADIUS = 40;
    const MID_X = 50;
    const MID_Y = 45;
    const MIN_RADIANS = 3*Math.PI/3;
    const MAX_RADIANS = 0;
    // map a value (x) from one range (in min/max) onto another (out min/max)
    const mapRange = (x, inMin, inMax, outMin, outMax) => {
        return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };
    export default {
		name:'KnobControl',
        data () {
            return {}
        },
        props: {
            'value': {
                type: Number,
                required: true
            },
            'max': {
                type: Number,
                default: 5000
            },
            'min': {
                type: Number,
                default: 0
            },
            'stepSize': {
                type: Number,
                default: 1000
            },
            'disabled': {
                type: Boolean,
                default: false
            },
            'size': {
                type: Number,
                default: 200
            },
            'primaryColor': {
                type: String,
                default: '#409eff'
            },
            'secondaryColor': {
                type: String,
                default: '#dcdfe6'
            },
            'textColor': {
                type: String,
                default: '#000000'
            },
            'strokeWidth': {
                type: Number,
                default: 13
            },
            'valueDisplayFunction': {
                type: Function,
                default: (v) => v
            },
        },
        computed: {
            rangePath () {
                return `M ${this.minX} ${this.minY} A ${RADIUS} ${RADIUS} 0 1 1 ${this.maxX} ${this.maxY}`;
            },
            valuePath () {
                return `M ${this.zeroX} ${this.zeroY} A ${RADIUS} ${RADIUS} 0 ${this.largeArc} ${this.sweep} ${this.valueX} ${this.valueY}`;
            },
            showValue () {
                return (this.value >= this.min && this.value <= this.max) && !this.disabled;
            },
            zeroRadians () {
                if (this.min > 0 && this.max > 0)
                    return mapRange(this.min, this.min, this.max, MIN_RADIANS, MAX_RADIANS);
                else
                    return mapRange(0, this.min, this.max, MIN_RADIANS, MAX_RADIANS);
            },
            valueRadians () {
                return mapRange(this.value, this.min, this.max, MIN_RADIANS, MAX_RADIANS);
            },
            minX () {
                return MID_X + Math.cos(MIN_RADIANS) * RADIUS;
            },
            minY () {
                return MID_Y - Math.sin(MIN_RADIANS) * RADIUS;
            },
            maxX () {
                return MID_X + Math.cos(MAX_RADIANS) * RADIUS;
            },
            maxY () {
                return MID_Y - Math.sin(MAX_RADIANS) * RADIUS;
            },
            zeroX () {
                return MID_X + Math.cos(this.zeroRadians) * RADIUS;
            },
            zeroY () {
                return MID_Y - Math.sin(this.zeroRadians) * RADIUS;
            },
            valueX () {
                return MID_X + Math.cos(this.valueRadians) * RADIUS;
            },
            valueY () {
                return MID_Y - Math.sin(this.valueRadians) * RADIUS;
            },
            largeArc () {
                return Math.abs(this.zeroRadians - this.valueRadians) < Math.PI ? 0 : 1;
            },
            sweep () {
                return this.valueRadians > this.zeroRadians ? 0 : 1;
            },
            valueDisplay () {
                return this.valueDisplayFunction(this.value);
            },
			cirx(){
				return this.minX
			},
			ciry(){
				return this.minY
				}
        },
        methods: {
            updatePosition (offsetX, offsetY) {
                const dx = offsetX - this.size / 2;
                const dy =  this.size / 2 - offsetY;
                const angle = Math.atan2(dy, dx);
                let v;
                const start = -Math.PI / 2 - Math.PI / 6;
                if (angle > MAX_RADIANS) {
                    v = mapRange(angle, MIN_RADIANS, MAX_RADIANS, this.min, this.max);
                } else if (angle < start) {
                    v = mapRange(angle + 2 * Math.PI, MIN_RADIANS, MAX_RADIANS, this.min, this.max);
                } else {
                    return;
                }
                this.$emit('input', Math.round((v - this.min) / this.stepSize) * this.stepSize + this.min);
            },
            onClick (e) {
                if (!this.disabled) {
                    this.updatePosition(e.offsetX, e.offsetY);
					console.log(e.preventDefault)	
                }
            },
            onMouseDown (e) {
                if (!this.disabled) {
                    e.preventDefault();
                    window.addEventListener('mousemove', this.onMouseMove);
                    window.addEventListener('mouseup', this.onMouseUp);
                }
            },
            onMouseUp (e) {
                if (!this.disabled) {
                    e.preventDefault();
                    window.removeEventListener('mousemove', this.onMouseMove);
                    window.removeEventListener('mouseup', this.onMouseUp);
                }
            },
            onTouchStart (e) {
                if (!this.disabled) {
                    e.preventDefault();
                    window.addEventListener('touchmove', this.onTouchMove);
                    window.addEventListener('touchend', this.onTouchEnd);
                }
            },
            onTouchEnd (e) {
                if (!this.disabled) {
                    e.preventDefault();
                    window.removeEventListener('touchmove', this.onTouchMove);
                    window.removeEventListener('touchend', this.onTouchEnd);
                }
            },
            onMouseMove (e) {
                if (!this.disabled) {
                    e.preventDefault();
                    this.updatePosition(e.offsetX, e.offsetY);
                }
            },
            onTouchMove (e) {
                if (!this.disabled && e.touches.length == 1) {
                    const boundingClientRect = this.$el.getBoundingClientRect();
                    const touch = e.targetTouches.item(0);
                    const offsetX = touch.clientX - boundingClientRect.left;
                    const offsetY = touch.clientY - boundingClientRect.top;
                    this.updatePosition(offsetX, offsetY);
                }
            },
        }
    };
</script>

<style>
    .knob-control__range {
        fill: none;
        transition: stroke .1s ease-in;
    }
    .knob-control__value {
        fill: none;
    }
    .knob-control__text-display {
        font-size: 0.24rem;
        text-align: center;
    }
	.knob-control__text-title{
		font-size: 0.12rem;
		text-align: center;
	}
</style>