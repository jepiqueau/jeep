import { evaluateString, getDim, getCssPropertyFromString } from './common';

describe('common utils', () => {
    describe('evaluate-string-utils', () => {

        it('should return null when first operator not in "+ - * /', () => {
            let val: number = evaluateString("100 ; 2");
            expect(val).toBeNull(); 
        });
        it('should return null when second operator not in "+ - * /', () => {
            let val: number = evaluateString("100 + 2 ; 50");
            expect(val).toBeNull(); 
        });
        it('should return 40 when string is "30 + 10"', () => {
            let val: number = evaluateString("30 + 10");
            expect(val).toEqual(40); 
        });
        it('should return 40 when string is "100 - 80 + 20"', () => {
            let val: number = evaluateString("100 - 80 + 20");
            expect(val).toEqual(40); 
        });

});
    describe('getDim', () => {
        it('should return the maximum dimension when no scss variable defined', () => {
            let scss: string = null;
            let value: number = getDim(scss,1024,"0")
            expect(value).toEqual(1024);
        });        
        it('should return the maximum dimension when scss variable equal "0"', () => {
            let scss: string = "0";
            let value: number = getDim(scss,1024,"0")
            expect(value).toEqual(1024);
        });        
        it('should return a percentage of the  maximum dimension when scss variable is ending with "%"', () => {
            let scss: string = "60%";
            let value: number = getDim(scss,1024,"0")
            expect(value).toEqual(614);
        });        
        it('should return the given dimension when scss variable is ending with "px"', () => {
            let scss: string = "350px";
            let value: number = getDim(scss,1024,"0")
            expect(value).toEqual(350);
        });        
        it('should return the maximum dimension when scss variable is not ending by "%" or "px"', () => {
            let scss: string = "150rem";
            let value: number = getDim(scss,1024,"0")
            expect(value).toEqual(1024);
        }); 
        it('should return the css properties from a style string', () => {
            const cstyle:string = "--height:250px;--width:70%;--top:20px;--left:10%;--backgroundcolor: rgb(248, 243, 222);"
            const prop: any = getCssPropertyFromString(cstyle);
            expect(prop.height).toEqual("250px");
            expect(prop.width).toEqual("70%");
            expect(prop.top).toEqual("20px");
            expect(prop.left).toEqual("10%");
            expect(prop.backgroundcolor).toEqual("rgb(248,243,222)");
        });
    });
});
