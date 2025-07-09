const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function generatePdfDesdeHtml(htmlcontent, outputpath) {
    let browser;

    try {
        
        //1 iniciar el navegador libreria de chromium
        browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();

        //2 establecer contenido de html
        await page.setContent(htmlcontent, {
            waitUntil:'networkidle2'
        });

        //opcional: esperar hasta q terminar el renderizado
        //await page.waitForTimeout(1000);

        //3 generacion del pdf
        await page.pdf({
            path: outputpath,
            format: 'A4',
            printBackground: true,
            margin:{
                top:'2cm',
                right:'2cm',
                bottom:'2cm',
                left:'2cm'
            },
            displayHeaderFooter: true,
            headerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Mi Encabezado Personalizado</div>',
            footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
        });


        console.log('PDF generado en:', outputpath);

    } catch (error) {
        console.error('Error en generar pdf', error);
    }
    finally{
        //4 cerrar el navegador
        if(browser){
            await browser.close();
        }
    }
    
}

// -------  CONTENIDO DEL HTML   --------
const htmlpdf = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Reporte PDF con Node.js y Puppeteer</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 0;
                color: #333;
                background-color: #f4f7f6;
                line-height: 1.6;
            }
            .container {
                width: 80%;
                margin: 40px auto;
                background-color: #ffffff;
                padding: 30px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
            }
            h1 {
                color: #2c3e50;
                text-align: center;
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            h2 {
                color: #34495e;
                margin-top: 25px;
                border-left: 5px solid #2ecc71;
                padding-left: 10px;
            }
            p {
                margin-bottom: 15px;
            }
            ul {
                list-style-type: disc;
                margin-left: 20px;
                margin-bottom: 15px;
            }
            li {
                margin-bottom: 8px;
            }
            .highlight {
                background-color: #ecf0f1;
                padding: 10px;
                border-radius: 5px;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #7f8c8d;
                margin-top: 40px;
                border-top: 1px solid #eee;
                padding-top: 15px;
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo img {
                max-width: 150px;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                </div>
            <h1>Reporte Mensual de Ventas - ${new Date().toLocaleString('es-EC', { month: 'long', year: 'numeric' })}</h1>
 
            <p>Este documento presenta un resumen detallado de las actividades de ventas para el mes en curso, generado automáticamente usando Node.js y Puppeteer. Es un ejemplo de cómo podemos automatizar la creación de informes complejos directamente desde datos.</p>
 
            <h2>Datos Clave</h2>
            <ul>
                <li>**Total de Ventas:** $150,000</li>
                <li>**Nuevos Clientes:** 75</li>
                <li>**Productos más Vendidos:**
                    <ul>
                        <li>Producto A (5,000 unidades)</li>
                        <li>Producto B (3,200 unidades)</li>
                        <li>Producto C (1,800 unidades)</li>
                    </ul>
                </li>
            </ul>
 
            <h2>Análisis Adicional</h2>
            <div class="highlight">
                <p>La implementación de nuestra nueva campaña de marketing digital ha mostrado un incremento del **25%** en la captación de leads, lo cual se traduce en un aumento significativo en las conversiones de este mes.</p>
            </div>
 
            <p>Continuaremos monitoreando estos indicadores para optimizar nuestras estrategias y asegurar un crecimiento sostenido.</p>
 
            <div class="footer">
                Generado el ${new Date().toLocaleDateString('es-EC')} ${new Date().toLocaleTimeString('es-EC')}. Todos los derechos reservados.
            </div>
        </div>
    </body>
    </html>
`;

// --- ejecutar la funcion de generacion de pdf ---
const nombreArchivo = 'reporte_test_vpr.pdf';
generatePdfDesdeHtml(htmlpdf, nombreArchivo);