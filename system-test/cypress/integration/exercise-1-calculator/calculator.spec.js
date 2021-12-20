/**
 * Getting familiar with Cypress (Mocha and Chai)
 * 
 * Mocha - it, describe https://mochajs.org/#getting-started
 * Chai 
 *   - expect https://www.chaijs.com/api/bdd/
 *   - throw https://www.chaijs.com/api/bdd/#method_throw
 * 
 * TODO
 * 1. Write test code for Calculator.multiply
 * 2. Write test code for Calculator.divide
 *   2.1 Use TDD style
 *   2.2 Handle divide by zero
 */

const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error('Cannot divide by zero.')
    }

    return a / b
  }
}

describe('Calculator operations', () => {
  describe('Add', () => {
    it('Add 1 by 2 should return 3', () => {
      const result = Calculator.add(1, 2)

      expect(result).to.equal(3)
    })

    it('Add 1 by 0 should return 1', () => {
      const result = Calculator.add(1, 0)

      expect(result).to.equal(1)
    })
  })

  describe('Subtract', () => {
    it('Subtract 3 by 1 should return 2', () => {
      const result = Calculator.subtract(3, 1)

      expect(result).to.equal(2)
    })

    it('Subtract 1 by 0 should return 1', () => {
      const result = Calculator.subtract(1, 0)

      expect(result).to.equal(1)
    })
  })

  // 1. Write test for Calculator.multiply
  describe('Multiply', () => {
    it('Multiply 4 by 3 should return 12', () => {
      const result = Calculator.multiply(4, 3)
  
      expect(result).to.equal(12)
    })

    it('Multiply 1 by 0 should return 0', () => {
      const result = Calculator.multiply(1, 0)
  
      expect(result).to.equal(0)
    })
  })
  

  // 2. Write test for Calculator.divide
  // 2.1 Use TDD style
  describe('Divide', () => {
    it('Divide 6 by 3 should return 2', () => {
      const result = Calculator.divide(6, 3)

      expect(result).to.equal(2)
    })

    it('Divide 0 by 1 should return 0', () => {
      const result = Calculator.divide(0, 1)

      expect(result).to.equal(0)
    })

    it('Divide 3 by 2 should return 1.5', () => {
      const result = Calculator.divide(3, 2)

      expect(result).to.equal(1.5)
    })

    // 2.2 Handle divide by zero
    it('Should throw error when divide by zero', () => {
      expect(() => Calculator.divide(12, 0)).to.throw()
    })
  })
})
