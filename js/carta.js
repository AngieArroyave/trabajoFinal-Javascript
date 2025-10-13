let skewSetter = gsap.quickTo(".foodMenu", "skewY"),
    clamp = gsap.utils.clamp(-20,20);

ScrollSmoother.create({
    wrapper: "#wrapper",
    content: "#content",
    smooth: 2,
    speed: 3,
    effects: true,
    onUpdate: self => skewSetter(clamp(self.getVelocity() / -50)),
    onStop: () => skewSetter(0)
});