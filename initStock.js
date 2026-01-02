const { sequelize, Categoria, Proveedor, Repuesto, MovimientoStock } = require('./models');

async function init() {
  try {
    // 1️⃣ Crear las tablas
    await sequelize.sync({ force: true }); // ⚠️ 'force: true' elimina tablas existentes

    console.log('Tablas sincronizadas correctamente');

    // 2️⃣ Crear 2 categorías
    const cat1 = await Categoria.create({ nombre: 'Frenos', descripcion: 'Pastillas, discos y líquidos de freno' });
    const cat2 = await Categoria.create({ nombre: 'Motor', descripcion: 'Filtros, aceite, correas' });

    // 3️⃣ Crear 1 proveedor
    const prov1 = await Proveedor.create({ nombre: 'Proveedor Ejemplo', contacto: 'Juan Pérez', telefono: '123456789', email: 'proveedor@taller.com' });

    // 4️⃣ Crear 1 repuesto
    const repuesto1 = await Repuesto.create({
      codigo: 'REP001',
      nombre: 'Pastilla de freno delantera',
      marca: 'Brembo',
      categoria_id: cat1.id,
      proveedor_id: prov1.id,
      stock_actual: 0,
      stock_minimo: 5,
      precio_compra: 1500,
      precio_venta: 2500,
      ubicacion: 'Estante A1'
    });

    // 5️⃣ Agregar movimiento ENTRADA
    await MovimientoStock.create({
      repuesto_id: repuesto1.id,
      tipo: 'ENTRADA',
      cantidad: 20,
      referencia: 'Compra inicial'
    });

    // 6️⃣ Actualizar stock_actual basado en movimientos
    const movimientos = await MovimientoStock.findAll({ where: { repuesto_id: repuesto1.id } });
    const stock = movimientos.reduce((total, mov) => {
      if (mov.tipo === 'ENTRADA') return total + mov.cantidad;
      if (mov.tipo === 'SALIDA') return total - mov.cantidad;
      return total;
    }, 0);

    await repuesto1.update({ stock_actual: stock });

    console.log(`Stock actualizado: ${repuesto1.nombre} - ${repuesto1.stock_actual} unidades`);

    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar stock:', error);
    process.exit(1);
  }
}

init();
