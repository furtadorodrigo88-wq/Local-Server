import request from 'supertest'
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest'
import createApp from '../src/app.js'

// Mock DB models to isolate tests from real DB
vi.mock('../src/models/orcamento.models.js', () => {
  return {
    OrcamentoModel: {
      create: vi.fn().mockResolvedValue({ id: 'orc1', total: 100, id_utilizadores: 'u1', enabled: true }),
      getAll: vi.fn().mockResolvedValue([{ id: 'orc1', total: 100, id_utilizadores: 'u1', enabled: true }]),
      get: vi.fn().mockResolvedValue({ id: 'orc1', total: 100, id_utilizadores: 'u1', enabled: true }),
      update: vi.fn().mockResolvedValue({ id: 'orc1', total: 120, id_utilizadores: 'u1', enabled: true }),
      delete: vi.fn().mockResolvedValue({ affectedRows: 1 }),
      atualizarTotal: vi.fn().mockResolvedValue(true)
    }
  }
})

vi.mock('../src/models/prestacao_servico.model.js', () => {
  return {
    PrestacaoServicoModel: {
      getByOrcamentoId: vi.fn().mockResolvedValue([])
    }
  }
})

vi.mock('../src/models/prestador.model.js', () => {
  return {
    PrestadorModel: {
      get: vi.fn().mockResolvedValue(null)
    }
  }
})

describe('Orcamento API Deep Dive', () => {
  const appPromise = async () => {
    // Lazy import the app to ensure mocks are in place first
    const app = await createApp()
    return app
  }

  beforeAll(async () => {
    // No-op, just ensure app is buildable
  })

  beforeEach(() => {
    // reset mocks if needed per test
    const { OrcamentoModel } = require('../src/models/orcamento.models.js')
    Object.values(OrcamentoModel as any).forEach((m: any) => m?.mockReset?.())
  })

  it('GET /orcamento should return all orcamentos', async () => {
    const app = await appPromise()
    const res = await request(app).get('/orcamento/')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data) || Array.isArray(res.body)).toBe(true)
  })

  it('POST /orcamento/create should create a new orçamento', async () => {
    const app = await appPromise()
    const payload = { total: 100, id_utilizadores: 'u1', enabled: true }
    const res = await request(app).post('/orcamento/create').send(payload)
    expect(res.status).toBe(201)
    expect(res.body.status).toBe(true)
  })

  it('GET /orcamento/get-by-id/:id should fetch by id', async () => {
    const app = await appPromise()
    const res = await request(app).get('/orcamento/get-by-id/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data')
  })

  it('PUT /orcamento/update/:id should update orçamento', async () => {
    const app = await appPromise()
    const payload = { total: 120, id_utilizadores: 'u1', enabled: true }
    const res = await request(app).put('/orcamento/update/1').send(payload)
    expect(res.status).toBe(200)
  })

  it('DELETE /orcamento/delete/:id should delete orçamento', async () => {
    const app = await appPromise()
    const res = await request(app).delete('/orcamento/delete/1')
    expect(res.status).toBe(200)
  })

  it('PUT /calcular/:id should calculate budget with mocked data', async () => {
    // Adjust mocks for calculation path
    const { PrestacaoServicoModel } = require('../src/models/prestacao_servico.model.js')
    const { PrestadorModel } = require('../src/models/prestador.model.js')
    const { OrcamentoModel } = require('../src/models/orcamento.models.js')
    ;(PrestacaoServicoModel.getByOrcamentoId as any).mockResolvedValue([
      { horas_estimadas: 2, preco_hora: 50, id_prestador: 'p1', id_orcamento: '1', urgente: true }
    ])
    ;(PrestadorModel.get as any).mockResolvedValue({ taxa_urgencia: 10, minimo_desconto: 20, percentagem_desconto: 5 })
    ;(OrcamentoModel.atualizarTotal as any).mockResolvedValue(true)

    const app = await appPromise()
    const res = await request(app).put('/calcular/1')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data')
  })
})
