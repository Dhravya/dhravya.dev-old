module.exports = {
  content: ["./templates/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        gatwick: "Gatwick"
    },
    animation:{
      blob:"blob 4s infinite"
    },
    keyFrames:{
      blob:{
        "0%":{
          transform: "scale(1)"
        },
        "33%":{
          transform: "scale(3)"
        },
        "66%":{
          transform: "scale(2)"
        },
        "100%":{
          transform: "scale(0.9)"
        }
      }
    },
  },
  plugins: [],
}
}