import { pgTable, uuid, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core'

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const proyectos = pgTable('proyectos', {
  id: uuid('id').primaryKey().defaultRandom(),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion'),
  categoria: text('categoria'),   // 'Educación' | 'Comercial' | 'Residencial' | etc.
  anio: integer('anio'),
  imagenUrl: text('imagen_url'),
  orden: integer('orden').default(0),
  activo: boolean('activo').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const novedades = pgTable('novedades', {
  id: uuid('id').primaryKey().defaultRandom(),
  titulo: text('titulo').notNull(),
  contenido: text('contenido'),
  imagenUrl: text('imagen_url'),
  publicado: boolean('publicado').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const servicios = pgTable('servicios', {
  id: uuid('id').primaryKey().defaultRandom(),
  titulo: text('titulo').notNull(),
  descripcion: text('descripcion'),
  orden: integer('orden').default(0),
  activo: boolean('activo').default(true),
})

// Configuración general: clave → valor (hero, contacto, nosotros, whatsapp)
export const config = pgTable('config', {
  clave: text('clave').primaryKey(),
  valor: text('valor'),
  updatedAt: timestamp('updated_at').defaultNow(),
})
