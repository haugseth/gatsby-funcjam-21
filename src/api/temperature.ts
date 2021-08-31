import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

// Formula : C->F (30°C x 1.8) + 32 = 86°F : F->C: (50°F - 32) x .5556 = 10°C
function calculateTemperature(temperature = 0, celsius = true) {
  return celsius ? Math.floor((temperature * 1.8) + 32) : Math.floor((temperature -32) * .5556);
}

export default function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  try {
    const { celsius, farenheit } = req.body;
    
    if ((!celsius && !farenheit) || (celsius && farenheit)) {
      throw new Error('You have to give one value in celsius or farenheit!');
    }
    
    if (!celsius && farenheit) {
      res.json({ 
        celsius: calculateTemperature(farenheit, false),
        farenheit: "" 
      });
    }

    if (celsius && !farenheit) {
      res.json({ 
        celsius: "",
        farenheit: calculateTemperature(celsius, true) 
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Ops, something is wrong!' });
  }
}