# WhatsApp AI Assistant

Implementazione di un chatbot per Whatsapp attraverso una piattaforma messa a disposizione per aziende e clienti. L'azienda, tramite la registrazione, ha la possibilità di caricare i documenti che inquadrino il contesto del loro business. Il cliente avrà poi la possibilità di contattare l'azienda, tramite reindirizzamento a Whatsapp dalla piattaforma, e le risposte ricevute saranno totalmente contestualizzate circa il business dell'azienda. 

## 🧠 Funzionalità principali

1. **Ricezione messaggio su WhatsApp**  
   Utilizza Twilio per ricevere messaggi inviati dagli utenti tramite WhatsApp.

2. **Identificazione azienda (`organization_id`)**  
   Il sistema identifica automaticamente l'organizzazione.

3. **Creazione embedding del messaggio**  
   Il testo ricevuto viene convertito in vettori numerici (embedding) per l'elaborazione semantica.

4. **Query su Qdrant (RAG)**  
   I vettori vengono confrontati con un database vettoriale Qdrant per recuperare i documenti più rilevanti.

5. **Prompt Gemini con documenti trovati**  
   I documenti rilevanti vengono inseriti come contesto in una richiesta a Vertex AI (modello Gemini).

6. **Risposta generata dall'IA**  
   Il modello AI genera una risposta coerente e personalizzata sulla base della query e del contesto.

7. **Invio della risposta su WhatsApp**  
   La risposta dell'IA viene inviata all'utente tramite WhatsApp.

---

## 🛠️ Stack Tecnologico

- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **AI:** Google Vertex AI (modello Gemini)  
- **Database Vettoriale:** Qdrant  
- **Messaggistica:** Twilio WhatsApp API  
- **Tunneling locale:** Ngrok

---

## 🚀 Avvio del progetto

### 1. Clona il repository

```bash
git clone https://github.com/tuo-utente/tuo-progetto.git
cd tuo-progetto
```

### 2. Avvia il frontend

```bash
cd client
npm install
npm run dev
```

### 3. Avvia il backend

```bash
cd server
npm install
npm start
```

### 4. Avvia Ngrok

```bash
ngrok http 3000
```
Salva il dominio HTTPS generato da Ngrok (es: https://mydomain.ngrok-free.app).

## 📲 Configurazione Twilio

1.  Registrati su [Twilio](https://www.twilio.com/).
2. Accedi alla Sandbox WhatsApp. 

3. Imposta l'URL del webhook nella sezione **`"When a message comes in"`** come segue:
   ```bash
   https://mydomain.ngrok-free.app/api/whatsapp/whatsapp-webhook
   ```
4. Modifica nel codice backend la variabile globale WHATSAPP_NUMBER con il numero WhatsApp associato alla sandbox Twilio.

## 🧩 Configurazione Qdrant
### 1. Registrazione
Registrati su Qdrant Cloud e crea un nuovo cluster. Dopo la creazione, accedi alla dashboard e recupera:
- #### API Key
- #### URL del cluster

### 2. Configura .env
Nel file .env del backend, aggiungi o modifica le seguenti variabili:

```bash
QDRANT_API_KEY=la_tua_api_key
QDRANT_URL=https://nome-cluster.qdrant.cloud
```

## 📌 Note
- Verifica che le credenziali per Vertex AI e Qdrant siano configurate correttamente nei rispettivi file di ambiente .env.
- Per un'esperienza stabile in produzione, considera di sostituire Ngrok con un dominio pubblico permanente.
