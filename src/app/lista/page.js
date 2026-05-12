'use client'
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .lw { min-height: 100vh; background: #0a0a0f; display: flex; align-items: flex-start; justify-content: center; padding: 3rem 1rem; font-family: 'DM Sans', sans-serif; }
  .lc { width: 100%; max-width: 600px; background: #111118; border: 1px solid #1e1e2e; border-radius: 20px; padding: 2.5rem; position: relative; overflow: hidden; }
  .lc::before { content: ''; position: absolute; top: -80px; right: -80px; width: 220px; height: 220px; background: radial-gradient(circle, rgba(120,80,255,0.18) 0%, transparent 70%); pointer-events: none; }

  .l-titulo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 2rem; color: #f0eeff; margin: 0 0 0.25rem; letter-spacing: -0.03em; }
  .l-sub { font-size: 0.875rem; color: #5a5a7a; margin: 0 0 2rem; font-weight: 300; }
  .l-label { font-size: 0.78rem; font-weight: 500; color: #7b7ba0; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
  .l-label-sm { font-size: 0.75rem; font-weight: 500; color: #5a5a7a; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 0.4rem; display: block; }

  .l-input { width: 100%; background: #0d0d17; border: 1px solid #2a2a40; border-radius: 12px; padding: 0.7rem 1rem; color: #e8e8f8; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
  .l-input::placeholder { color: #3a3a55; }
  .l-input:focus { border-color: #7b5dfa; box-shadow: 0 0 0 3px rgba(123,93,250,0.12); }

  .l-textarea { width: 100%; background: #0d0d17; border: 1px solid #2a2a40; border-radius: 12px; padding: 0.7rem 1rem; color: #e8e8f8; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; outline: none; resize: vertical; min-height: 70px; transition: border-color 0.2s, box-shadow 0.2s; }
  .l-textarea::placeholder { color: #3a3a55; }
  .l-textarea:focus { border-color: #7b5dfa; box-shadow: 0 0 0 3px rgba(123,93,250,0.12); }

  .l-row { margin-bottom: 1rem; }
  .l-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1rem; }

  .l-btn { background: #7b5dfa; border: none; border-radius: 12px; padding: 0.7rem 1.25rem; color: #fff; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: background 0.2s, transform 0.1s, box-shadow 0.2s; white-space: nowrap; }
  .l-btn:hover { background: #9070ff; box-shadow: 0 4px 20px rgba(123,93,250,0.35); }
  .l-btn:active { transform: scale(0.97); }
  .l-btn:disabled { background: #2a2a40; color: #4a4a65; cursor: not-allowed; box-shadow: none; }
  .l-btn-full { width: 100%; margin-top: 0.25rem; }

  .l-divider { height: 1px; background: #1e1e2e; margin: 1.75rem 0 1.5rem; }

  .l-topo { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .l-topo-label { font-size: 0.78rem; font-weight: 500; color: #5a5a7a; letter-spacing: 0.08em; text-transform: uppercase; }
  .l-badge { background: #1a1a2e; border: 1px solid #2a2a40; border-radius: 20px; padding: 2px 10px; font-family: 'Syne', sans-serif; font-size: 0.78rem; font-weight: 600; color: #7b5dfa; }

  .l-cores { display: flex; gap: 7px; flex-wrap: wrap; margin-top: 4px; }
  .l-cor { width: 22px; height: 22px; border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: transform 0.15s, border-color 0.15s; flex-shrink: 0; }
  .l-cor:hover { transform: scale(1.2); }
  .l-cor.ativa { border-color: #fff; transform: scale(1.15); }

  .l-items { display: flex; flex-direction: column; gap: 10px; }

  .l-item { border-radius: 14px; border: 1px solid #1e1e2e; background: #0d0d17; overflow: hidden; animation: slideIn 0.28s cubic-bezier(0.34, 1.3, 0.64, 1) both; transition: border-color 0.2s; }
  .l-item:hover { border-color: #2a2a40; }
  .l-item.concluida { opacity: 0.5; }
  .l-item-topo { display: flex; align-items: center; gap: 10px; padding: 0.85rem 1rem; }
  .l-item-accent { width: 3px; height: 36px; border-radius: 3px; flex-shrink: 0; transition: opacity 0.2s; }
  .l-item.concluida .l-item-accent { opacity: 0.3; }

  .l-check-wrap { flex-shrink: 0; position: relative; width: 20px; height: 20px; }
  .l-check-wrap input[type=checkbox] { position: absolute; opacity: 0; width: 20px; height: 20px; cursor: pointer; margin: 0; z-index: 2; }
  .l-check-box { width: 20px; height: 20px; border-radius: 5px; border: 2px solid #3a3a55; background: #0a0a0f; display: flex; align-items: center; justify-content: center; transition: background 0.2s, border-color 0.2s; }
  .l-check-wrap input:checked ~ .l-check-box { background: #7b5dfa; border-color: #7b5dfa; }
  .l-check-box svg { display: none; }
  .l-check-wrap input:checked ~ .l-check-box svg { display: block; }

  .l-item-info { flex: 1; min-width: 0; }
  .l-item-titulo { font-size: 0.95rem; font-weight: 500; color: #c8c8e8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s; }
  .l-item.concluida .l-item-titulo { text-decoration: line-through; color: #5a5a7a; }
  .l-item-desc-prev { font-size: 0.78rem; color: #5a5a7a; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .l-item-acoes { display: flex; gap: 4px; flex-shrink: 0; }
  .l-ico-btn { background: none; border: none; cursor: pointer; border-radius: 7px; padding: 4px 7px; font-size: 0.85rem; color: #4a4a65; transition: color 0.2s, background 0.2s; line-height: 1; }
  .l-ico-btn.editar:hover { color: #7b5dfa; background: rgba(123,93,250,0.12); }
  .l-ico-btn.apagar:hover { color: #ff6b6b; background: rgba(255,107,107,0.1); }

  .l-item-edicao { padding: 0 1rem 1rem; border-top: 1px solid #1e1e2e; display: flex; flex-direction: column; gap: 10px; animation: fadeIn 0.2s ease both; }
  .l-edicao-header { font-size: 0.72rem; font-weight: 500; color: #5a5a7a; letter-spacing: 0.08em; text-transform: uppercase; padding-top: 0.75rem; }
  .l-edicao-btns { display: flex; gap: 8px; }
  .l-btn-salvar { background: #7b5dfa; border: none; border-radius: 9px; padding: 0.5rem 1rem; color: #fff; font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .l-btn-salvar:hover { background: #9070ff; }
  .l-btn-cancelar { background: #1a1a2e; border: 1px solid #2a2a40; border-radius: 9px; padding: 0.5rem 1rem; color: #7b7ba0; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; cursor: pointer; }
  .l-btn-cancelar:hover { background: #222235; }

  .l-vazia { text-align: center; padding: 2rem 0 1rem; color: #3a3a55; font-size: 0.9rem; font-style: italic; font-weight: 300; }
  .l-vazia-icon { font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.4; }

  /* ── CELEBRAÇÃO ── */
  .celebracao-overlay {
    position: fixed; inset: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    background: rgba(10,10,15,0.82);
    animation: fadeIn 0.4s ease both;
  }
  .celebracao-card {
    background: #111118; border: 1px solid #2a2a40;
    border-radius: 24px; padding: 3rem 2.5rem;
    text-align: center; max-width: 380px; width: 90%;
    position: relative; overflow: hidden;
    animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .celebracao-card::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(123,93,250,0.25) 0%, transparent 65%);
    pointer-events: none;
  }
  .celebracao-emoji { font-size: 3.5rem; display: block; margin-bottom: 1rem; animation: bounce 0.6s 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }
  .celebracao-titulo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.75rem; color: #f0eeff; margin: 0 0 0.5rem; letter-spacing: -0.03em; }
  .celebracao-msg { font-size: 0.9rem; color: #7b7ba0; margin: 0 0 2rem; line-height: 1.6; }
  .celebracao-btn { background: #7b5dfa; border: none; border-radius: 12px; padding: 0.8rem 2rem; color: #fff; font-family: 'Syne', sans-serif; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s, transform 0.1s; }
  .celebracao-btn:hover { background: #9070ff; }
  .celebracao-btn:active { transform: scale(0.97); }

  /* confettis */
  .confetti-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 999; overflow: hidden; }
  .conf {
    position: absolute; top: -16px; border-radius: 2px;
    animation: confettiFall linear both;
  }
  @keyframes confettiFall {
    0%   { transform: translateY(0)    rotate(0deg);   opacity: 1; }
    85%  { opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  @keyframes slideIn { from { opacity: 0; transform: translateY(-8px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
  @keyframes popIn   { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
  @keyframes bounce  { from { transform: scale(0.5) translateY(20px); } to { transform: scale(1) translateY(0); } }
`;

const CORES = [
    { hex: '#7b5dfa' }, { hex: '#22d3b8' }, { hex: '#f471b5' }, { hex: '#fb923c' },
    { hex: '#4ade80' }, { hex: '#60a5fa' }, { hex: '#f87171' }, { hex: '#fbbf24' },
];

const CONF_COLORS = ['#7b5dfa','#22d3b8','#f471b5','#fb923c','#4ade80','#60a5fa','#f87171','#fbbf24','#ffffff'];

function gerarConfettis(n = 80) {
    return Array.from({ length: n }, (_, i) => ({
        id: i,
        left:     Math.random() * 100,
        width:    6 + Math.random() * 8,
        height:   10 + Math.random() * 14,
        color:    CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)],
        delay:    Math.random() * 1.2,
        duration: 2.5 + Math.random() * 2.5,
    }));
}

export default function Lista() {
    const [titulo,     setTitulo]     = useState("");
    const [descricao,  setDescricao]  = useState("");
    const [cor,        setCor]        = useState(CORES[0].hex);
    const [lista,      setLista]      = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [editDados,  setEditDados]  = useState({});
    const [celebrar,   setCelebrar]   = useState(false);
    const [confettis,  setConfettis]  = useState([]);
    const prevConcluidas = useRef(0);

    /* dispara celebração quando todas ficam concluídas */
    useEffect(() => {
        const total = lista.length;
        const feitas = lista.filter(i => i.concluida).length;
        if (total > 0 && feitas === total && prevConcluidas.current < total) {
            setConfettis(gerarConfettis(90));
            setCelebrar(true);
        }
        prevConcluidas.current = feitas;
    }, [lista]);

    const fecharCelebracao = () => { setCelebrar(false); setConfettis([]); };

    const handleAdicionar = () => {
        const t = titulo.trim();
        if (!t) return;
        setLista(prev => [...prev, { id: Date.now(), titulo: t, descricao: descricao.trim(), cor, concluida: false }]);
        setTitulo(""); setDescricao(""); setCor(CORES[0].hex);
    };

    const toggleConcluida = (id) =>
        setLista(prev => prev.map(i => i.id === id ? { ...i, concluida: !i.concluida } : i));

    const abrirEdicao = (item) => {
        setEditandoId(item.id);
        setEditDados({ titulo: item.titulo, descricao: item.descricao, cor: item.cor });
    };

    const salvarEdicao = (id) => {
        const t = editDados.titulo.trim();
        if (!t) return;
        setLista(prev => prev.map(i => i.id === id ? { ...i, ...editDados, titulo: t } : i));
        setEditandoId(null);
    };

    const remover = (id) => setLista(prev => prev.filter(i => i.id !== id));

    const concluidas = lista.filter(i => i.concluida).length;

    return (
        <>
            <style>{styles}</style>

            {/* ── Confettis ── */}
            {confettis.length > 0 && (
                <div className="confetti-wrap">
                    {confettis.map(c => (
                        <div key={c.id} className="conf" style={{
                            left:              `${c.left}%`,
                            width:             `${c.width}px`,
                            height:            `${c.height}px`,
                            background:        c.color,
                            animationDuration: `${c.duration}s`,
                            animationDelay:    `${c.delay}s`,
                        }} />
                    ))}
                </div>
            )}

            {/* ── Modal de celebração ── */}
            {celebrar && (
                <div className="celebracao-overlay" onClick={fecharCelebracao}>
                    <div className="celebracao-card" onClick={e => e.stopPropagation()}>
                        <span className="celebracao-emoji">🎉</span>
                        <h2 className="celebracao-titulo">Missão cumprida!</h2>
                        <p className="celebracao-msg">
                            Concluíste todas as tarefas da lista.<br />
                            O teu esforço valeu a pena — vai descansar, mereces!
                        </p>
                        <button className="celebracao-btn" onClick={fecharCelebracao}>
                            Fechar e continuar ✨
                        </button>
                    </div>
                </div>
            )}

            <div className="lw">
                <div className="lc">
                    <h2 className="l-titulo">Lista de tarefas</h2>
                    <p className="l-sub">Organiza o teu dia, uma tarefa de cada vez.</p>

                    <label className="l-label">Título da tarefa</label>
                    <div className="l-row">
                        <input className="l-input" value={titulo} onChange={e => setTitulo(e.target.value)}
                               onKeyDown={e => e.key === 'Enter' && handleAdicionar()}
                               placeholder="Ex: Enviar relatório ao cliente…" />
                    </div>

                    <div className="l-form-grid">
                        <div>
                            <label className="l-label-sm">Descrição <span style={{color:'#3a3a55'}}>(opcional)</span></label>
                            <textarea className="l-textarea" value={descricao} onChange={e => setDescricao(e.target.value)}
                                      placeholder="Adiciona mais detalhes…" />
                        </div>
                        <div>
                            <label className="l-label-sm">Cor da tarefa</label>
                            <div className="l-cores">
                                {CORES.map(c => (
                                    <div key={c.hex} className={`l-cor${cor === c.hex ? ' ativa' : ''}`}
                                         style={{ background: c.hex }} onClick={() => setCor(c.hex)} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <button className="l-btn l-btn-full" onClick={handleAdicionar} disabled={!titulo.trim()}>
                        + Adicionar tarefa
                    </button>

                    <div className="l-divider" />

                    <div className="l-topo">
                        <span className="l-topo-label">Tarefas</span>
                        <span className="l-badge">{concluidas}/{lista.length} concluídas</span>
                    </div>

                    <div className="l-items">
                        {lista.length === 0 && (
                            <div className="l-vazia">
                                <div className="l-vazia-icon">✦</div>
                                Nenhuma tarefa ainda. Começa a adicionar!
                            </div>
                        )}

                        {lista.map(item => (
                            <div key={item.id} className={`l-item${item.concluida ? ' concluida' : ''}`}>
                                <div className="l-item-topo">
                                    <div className="l-item-accent" style={{ background: item.cor }} />

                                    <label className="l-check-wrap" onClick={e => e.stopPropagation()}>
                                        <input type="checkbox" checked={item.concluida}
                                               onChange={() => toggleConcluida(item.id)} />
                                        <div className="l-check-box">
                                            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                                <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2"
                                                      strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </label>

                                    <div className="l-item-info">
                                        <div className="l-item-titulo">{item.titulo}</div>
                                        {item.descricao && (
                                            <div className="l-item-desc-prev">{item.descricao}</div>
                                        )}
                                    </div>

                                    <div className="l-item-acoes">
                                        <button className="l-ico-btn editar" title="Editar"
                                                onClick={() => editandoId === item.id ? setEditandoId(null) : abrirEdicao(item)}>✎</button>
                                        <button className="l-ico-btn apagar" title="Remover"
                                                onClick={() => remover(item.id)}>✕</button>
                                    </div>
                                </div>

                                {editandoId === item.id && (
                                    <div className="l-item-edicao">
                                        <div className="l-edicao-header">Editar tarefa</div>
                                        <div>
                                            <label className="l-label-sm">Título</label>
                                            <input className="l-input" value={editDados.titulo}
                                                   onChange={e => setEditDados(p => ({ ...p, titulo: e.target.value }))} />
                                        </div>
                                        <div>
                                            <label className="l-label-sm">Descrição</label>
                                            <textarea className="l-textarea" value={editDados.descricao}
                                                      onChange={e => setEditDados(p => ({ ...p, descricao: e.target.value }))}
                                                      placeholder="Adiciona mais detalhes…" />
                                        </div>
                                        <div>
                                            <label className="l-label-sm">Cor</label>
                                            <div className="l-cores">
                                                {CORES.map(c => (
                                                    <div key={c.hex} className={`l-cor${editDados.cor === c.hex ? ' ativa' : ''}`}
                                                         style={{ background: c.hex }}
                                                         onClick={() => setEditDados(p => ({ ...p, cor: c.hex }))} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="l-edicao-btns">
                                            <button className="l-btn-salvar" onClick={() => salvarEdicao(item.id)}>Guardar</button>
                                            <button className="l-btn-cancelar" onClick={() => setEditandoId(null)}>Cancelar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}